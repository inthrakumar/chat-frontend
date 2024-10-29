import React from 'react'
import { SignUpForm } from '@/components/Auth/SignUpForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from '@/components/Auth/SignInForm';
import bg from '../public/auth_bg.jpg'

const Auth = () => {
    return (
        <div className='relative min-w-[100vw] w-[100vw] min-h-screen flex items-center justify-center'>
            {/* Background with opacity */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat opacity-80"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />

            {/* Tabs with SignIn and SignUp forms */}
            <Tabs defaultValue="signin" className="relative z-10 min-w-[600px] min-h-[533px] bg-transparent rounded-sm shadow-lg">
                <TabsList>
                    <TabsTrigger value="signin">Login Account</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className='min-h-[494px]'><SignInForm /></TabsContent>
                <TabsContent value="signup" className='min-h-[494px]'><SignUpForm /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth;
