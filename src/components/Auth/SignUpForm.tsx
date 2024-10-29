"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { defAxios } from '../../config/axiosconfig'
import { Button } from "@/components/ui/button"
import { AxiosError } from "axios"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MoveRight } from "lucide-react"
import { useState } from 'react';


const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(20, { message: "Username must be at most 20 characters" }),
    email: z.string().email({ message: "Enter a proper email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .regex(regex, { message: "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    confirmpassword: z.string().min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Password must be at most 20 characters" }),
}).refine(data => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});

export function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            setIsLoading(true);
            setError(null);
            const response = await defAxios.post('/auth/local/signup', {
                username: values.username,
                email: values.email,
                password: values.password,
            })
            console.log(response.data);
            console.log("User created successfully")
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message || "An error occurred");
            } else {
                setError("An unexpected error occurred");
            }
            console.log(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    return (
        <div className="min-w-[100%] !min-h-[494px] flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[75%] space-y-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription className="text-white">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Email Registration</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">ConfirmPassword</FormLabel>
                                <FormControl>
                                    <Input placeholder="ConfirmPassword" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex items-center justify-center">
                        <Button type="submit" className="group" disabled={isLoading}>
                            {
                                isLoading ? "Creating..." : "Create"
                            }
                            <span className="hidden group-hover:inline">
                                <MoveRight />
                            </span>
                        </Button>
                    </div>

                </form>
            </Form>
        </div>

    )
}
