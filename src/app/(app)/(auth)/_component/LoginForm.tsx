"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useCallback } from "react";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries();
    toast.success("You are sucessfully login");
    router.push("/");
  }, [router,queryClient]);

  const login = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errors = await res.json();
        throw new Error(errors.message || "Login failed");
      }

      return res.json();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: handleSuccess,
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = useCallback(
    (values: z.infer<typeof loginSchema>) => {
      login.mutate(values);
    },
    [login]
  );
  return (
    <Form {...form}>
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className=" relative ">
                        <Mail className="absolute left-4 top-5 h-5 w-5 text-slate-400" />
                        <Input
                          {...field}
                          type="text"
                          required
                          className="pl-12 h-14 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base bg-slate-50/80 focus:bg-white transition-all duration-200"
                          placeholder="investor@financehub.com"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-5 h-5 w-5 text-slate-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          required
                          className="pl-12 pr-12 h-14 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base bg-slate-50/80 focus:bg-white transition-all duration-200"
                          placeholder="Enter your secure password"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                          onClick={() => setShowPassword((e) => !e)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
                {/* todo */}
          {/* <div className="flex items-center justify-between pt-2  ">
            <div className="text-sm ml-auto ">
              <Link
                prefetch
                href={"/forget-password"}
                className="font-semibold text-blue-500 hover:text-blue-700 transition-colors underline"
              >
                Reset password
              </Link>
            </div>
          </div> */}

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Login
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default LoginForm;
