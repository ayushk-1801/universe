import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";
import bcrypt from "bcryptjs";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "student-signin",
            name: "Student Sign In",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await prisma.student.findFirst({
                    where: { email: credentials?.email }
                });

                if (user && bcrypt.compareSync(credentials?.password, user.password)) {
                    return user;
                }
                return null;
            }
        }),

        CredentialsProvider({
            id: "student-signup",
            name: "Student Sign Up",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const existingUser = await prisma.student.findFirst({
                    where: { email: credentials?.email }
                });

                if (existingUser) {
                    throw new Error("User already exists");
                }

                const hashedPassword = bcrypt.hashSync(credentials?.password, 10);
                const newUser = await prisma.student.create({
                    data: {
                        name: credentials?.name,
                        email: credentials?.email,
                        password: hashedPassword,
                        role: "student"
                    }
                });

                return newUser;
            }
        }),

        CredentialsProvider({
            id: "professor-signin",
            name: "Professor Sign In",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await prisma.professor.findFirst({
                    where: { email: credentials?.email }
                });

                if (user && bcrypt.compareSync(credentials?.password, user.password)) {
                    return user;
                }
                return null;
            }
        }),

        CredentialsProvider({
            id: "professor-signup",
            name: "Professor Sign Up",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const existingUser = await prisma.professor.findFirst({
                    where: { email: credentials?.email }
                });

                if (existingUser) {
                    throw new Error("User already exists");
                }

                const hashedPassword = bcrypt.hashSync(credentials?.password, 10);
                const newUser = await prisma.professor.create({
                    data: {
                        name: credentials?.name,
                        email: credentials?.email,
                        password: hashedPassword,
                        role: "professor"
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
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role
            }
            return token;
        }
    }
};

export default NextAuth(authOptions);
