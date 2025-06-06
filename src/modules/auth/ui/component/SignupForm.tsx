"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/lib/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, Mail, User, Lock } from "lucide-react";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: " ",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const trpc = useTRPC();
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        router.push("/");
      },
    })
  );
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("Form values:", values); // check email value here
    register.mutate(values);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <div className=" relative ">
                        <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                        <Input
                          {...field}
                          type="text"
                          className="pl-12 h-14 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base bg-slate-50/80 focus:bg-white transition-all duration-200"
                          placeholder="Ajay singh"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Email adresss
                    </FormLabel>
                    <FormControl>
                      <div className=" relative ">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                        <Input
                          {...field}
                          type="email"
                          className="pl-12 h-14 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base bg-slate-50/80 focus:bg-white transition-all duration-200"
                          placeholder="Alex@gmail.com"
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
                          onClick={() => setShowPassword((prev) => !prev)}
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-5 h-5 w-5 text-slate-400" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          className="pl-12 pr-12 h-14 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base bg-slate-50/80 focus:bg-white transition-all duration-200"
                          placeholder="confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
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

          <div className="flex items-start space-x-3 pt-2">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded mt-1"
            />
            <label
              htmlFor="agree-terms"
              className="text-sm text-slate-600 leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Start your journey
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
