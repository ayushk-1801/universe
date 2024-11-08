import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@repo/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "login", // Unique identifier for login
            name: "Login",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.student.findFirst({
                    where: { email: credentials.email }
                });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                }
                return null;
            }
        }),
        CredentialsProvider({
            id: "register", // Unique identifier for registration
            name: "Register",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "John Smith" },
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const existingUser = await prisma.student.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if (existingUser) {
                    throw new Error("User already exists");
                }

                const hashedPassword = bcrypt.hashSync(credentials.password, 10);
                const newUser = await prisma.student.create({
                    data: {
                        name: credentials.name,
                        email: credentials.email,
                        password: hashedPassword
                    }
                });
                return newUser;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token, user }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        }
    }
});

export { handler as GET, handler as POST };
