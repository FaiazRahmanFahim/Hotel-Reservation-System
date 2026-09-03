"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

type EmailFormData = {
  email: string;
};

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>();

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/hoteladmin-login/forgot-password`,
        { email: data.email },
        { withCredentials: true }
      );
      
      toast.success("Reset code sent to your email");
      router.push('/reset-password');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to send reset code");
      } else {
        toast.error("Failed to send reset code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b 
        from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email to receive a reset code
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="Enter your email address" 
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <span className="text-red-700 text-sm font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                         inline-flex items-center gap-2 transition-colors duration-200">
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}