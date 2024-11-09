"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { signIn } from "next-auth/react"
import { useState } from "react"

interface AuthProps {
    type: "signin" | "signup";
}

const Auth: React.FC<AuthProps> = ({ type }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleAuth = async (role: "student" | "professor") => {
        const providerId =
            role === "student" && type === "signin"
                ? "student-signin"
                : role === "student" && type === "signup"
                    ? "student-signup"
                    : role === "professor" && type === "signin"
                        ? "professor-signin"
                        : "professor-signup"

        try {
            const result = await signIn(providerId, {
                redirect: false,
                email,
                password,
                ...(type === "signup" ? { name } : {}),
                callbackUrl: "/home",
            })

            if (result?.error) {
                console.error("Authentication error:", result.error)
            } else {
                console.log("Authentication successful:", result)
            }
        } catch (error) {
            console.error("SignIn error:", error)
        }
    }

    return (
        <div>
            <Tabs defaultValue="student" className="w-[400px] mt-4">
                <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-violet-600 mb-2">
                        {type === "signin" ? "Sign In" : "Sign Up"}
                    </div>
                    {type === "signin" ? (
                        <div>
                            Don&apos;t have an account? <a href="/signup" className="underline">Sign up</a>
                        </div>
                    ) : (
                        <div>
                            Already have an account? <a href="/signin" className="underline">Sign in</a>
                        </div>
                    )}
                </div>
                <TabsList className="grid w-full grid-cols-2 mt-6">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="professor">Professor</TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                    <Card>
                        <CardContent className="space-y-2 mt-4">
                            {type === "signup" && (
                                <div className="space-y-1">
                                    <Label htmlFor="studentName">Name</Label>
                                    <Input
                                        id="studentName"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <Label htmlFor="studentEmail">Email</Label>
                                <Input
                                    id="studentEmail"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="studentPassword">Password</Label>
                                <Input
                                    id="studentPassword"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleAuth("student")}>
                                {type === "signin" ? "Sign In as Student" : "Sign Up as Student"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="professor">
                    <Card>
                        <CardContent className="space-y-2 mt-4">
                            {type === "signup" && (
                                <div className="space-y-1">
                                    <Label htmlFor="professorName">Name</Label>
                                    <Input
                                        id="professorName"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <Label htmlFor="professorEmail">Email</Label>
                                <Input
                                    id="professorEmail"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="professorPassword">Password</Label>
                                <Input
                                    id="professorPassword"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleAuth("professor")}>
                                {type === "signin" ? "Sign In as Professor" : "Sign Up as Professor"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth;
