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

// Match your DTO
type ResetFormData = {
  reset_token: string;
  new_password: string;
};

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>();

  const onSubmit = async (data: ResetFormData) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/hoteladmin-login/reset-password`,
        { 
          reset_token: data.reset_token,
          new_password: data.new_password 
        },
        { withCredentials: true }
      );
      
      toast.success("Password reset successfully");
      router.push('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to reset password");
      } else {
        toast.error("Failed to reset password");
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter the verification code and your new password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset_token">Verification Code</Label>
              <Input 
                {...register("reset_token", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit code",
                  },
                })}
                id="reset_token"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={errors.reset_token ? "border-red-500" : ""}
              />
              {errors.reset_token && (
                <span className="text-red-700 text-sm font-bold">
                  {errors.reset_token.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input 
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                id="new_password"
                type="password"
                placeholder="Enter new password"
                className={errors.new_password ? "border-red-500" : ""}
              />
              {errors.new_password && (
                <span className="text-red-700 text-sm font-bold">
                  {errors.new_password.message}
                </span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                         inline-flex items-center gap-2 transition-colors duration-200">
                <span>Back to Email Verification</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}