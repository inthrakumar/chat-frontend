"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MoveRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
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


const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const formSchema = z.object({
    identifier: z.union([z.string().email(), z.string()]),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .regex(regex, { message: "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character" }),
});

export function SignInForm() {
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
        },
    })

    return (
        <div className="min-w-[100%] !min-h-[494px] flex flex-col items-center pt-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[75%] space-y-8">
                    <FormField
                        control={form.control}
                        name="identifier"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Username Or Email</FormLabel>
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

                    <div className="w-full flex items-center justify-center">
                        <Button type="submit" className="group">
                            Login
                            <span className="hidden group-hover:inline">
                                <MoveRight />
                            </span>
                        </Button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <Link to={'/authenticate'} className="hover:underline text-white"> Forgot Password ?</Link>
                    </div>
                </form>
            </Form>
        </div>

    )
}
