import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { headers as getHeaders, cookies as getCookies } from "next/headers";

// import { AUTH_COOKIE } from "../constants"; // Ensure AUTH_COOKIE is defined properly

// Define Input Schemas using zod for validation
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "name is required"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

// Define the AuthRouter with session, register, login, and logout
export const authRouter = createTRPCRouter({
  // Session retrieval
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders(); // Retrieve headers for session
    const session = await ctx.payload.auth({ headers });
    return session;
  }),

  // Register new user
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if username already exists
        const existingUser = await ctx.payload.find({
          collection: "users",
          limit: 1,
          where: {
            email: { equals: input.email },
          },
        });

        if (existingUser.docs.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User is already there.",
          });
        }

        // Create user
        await ctx.payload.create({
          collection: "users",
          data: {
            email: input.email,
            password: input.password,
            name: input.name,
          },
        });

        // Perform login immediately after registration
        const loginData = await ctx.payload.login({
          collection: "users",
          data: {
            email: input.email,
            password: input.password,
          },
        });

        if (!loginData.token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Failed to log in after registration",
          });
        }

        // Set authentication cookie

        const cookies = await getCookies();
        cookies.set({
          name: "payload-token",
          value: loginData.token,
          httpOnly: true,
          path: "/",
          ...(process.env.NODE_ENV !== "development" && {
            sameSite: "none",
            domain: process.env.NEXT_PUBLIC_APP_URL,
            secure: true,
          }),
        });

        return loginData; // Return user data along with token
      } catch (error) {
        console.log("Registration Error:", error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }),

  // Login user
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    try {
      const loginData = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!loginData.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Set authentication cookie
      const cookies = await getCookies();
      cookies.set({
        name: "payload-token",
        value: loginData.token,
        httpOnly: true,
        path: "/",
        ...(process.env.NODE_ENV !== "development" && {
          sameSite: "none",
          domain: process.env.NEXT_PUBLIC_APP_URL,
          secure: true,
        }),
      });

      return loginData; // Return user data and token
    } catch (error) {
      console.log("Login Error:", error);
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }),

  // Logout user
  logout: baseProcedure.mutation(async () => {
    try {
      const cookies = await getCookies();
      cookies.delete("payload-token"); // Remove the authentication cookie
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout Error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while logging out",
      });
    }
  }),
});
