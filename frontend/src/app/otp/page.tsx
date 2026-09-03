"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

type FormData = {
  reset_token: string;
};

export default function VerifyOTP() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Verify the OTP
      await axios.post(
        "http://localhost:3000/hoteladmin-login/verify-token",
        { verificationCode: data.reset_token },
        { withCredentials: true }
      );
      
      toast.success("OTP verified successfully");
      // Store the token in sessionStorage for the next step
      sessionStorage.setItem('reset_token', data.reset_token);
      router.push('/reset-password'); // Redirect to password change page
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid OTP");
      } else {
        toast.error("Invalid OTP");
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
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please enter the 6-digit code sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input 
                {...register("reset_token", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit code",
                  },
                })}
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              {errors.reset_token && (
                <span className="text-red-700 text-sm font-bold">
                  {errors.reset_token.message}
                </span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                         inline-flex items-center gap-2 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 stroke-2" />
                <span>Back to Reset Password</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}