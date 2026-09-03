"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"

interface LoginFormValues {
    username?: string;
    password?: string;
}

export default function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>();

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const formSubmitted = async (data: LoginFormValues) => {
        setIsLoading(true)
        setError("")
        try {
            const Rresponse = await axios.post(`${API_BASE_URL}/auth/login`, {
                username: data.username,
                password: data.password
            }, { withCredentials: true });

            if (Rresponse.status === 200) {
                router.push("/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch {
            setError("Invalid username or password");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b 
            from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
        
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
                <div className="text-center">
                <div className="flex justify-center mb-4">
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Thank you for getting back, please sign in to your account.
                </p>
                </div>
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center font-medium">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(formSubmitted)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Username</Label>
                        <Input 
                        {...register("username",{
                            required: "Username is required",
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Username must contain only letters and numbers"
                            }
                        })}
                        id="username"
                        type="text"
                        placeholder="Enter your username" />
                        {errors.username && typeof errors.username.message === "string" && (
                            <span className="text-red-700 text-sm font-bold">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                        {...register("password",{
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        id="password"
                        type="password"
                        placeholder="Enter your password" />
                        {errors.password && typeof errors.password.message === "string" && (
                            <span className="text-red-700 text-sm font-bold">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="text-right">
                        <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                        Forgot password?
                        </a>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}>

                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </div>
                </form>
            </div>
        </div>
    )
}