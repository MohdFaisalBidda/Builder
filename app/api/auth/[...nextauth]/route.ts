import prisma from "@/lib/prisma";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    id: string,
    username: string,
    email: string
}

const handler = NextAuth({
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials?.email },
                    });
                    if (!user) {
                        console.error("User not found");
                        return null;
                    }
                    const passwordCorrect = await compare(credentials?.password || "", user.password)
                    console.log({ passwordCorrect });
                    if (passwordCorrect) {
                        const userId = user.id.toString()
                        return {
                            id: userId,
                            username: user.username,
                            email: user.email
                        } as User
                    }

                    // Return null if user data could not be retrieved
                    console.error("Incorrect password");
                    return null
                } catch (error) {
                    console.error("Error retrieving user", error);
                    return null;

                }
            }
        })
    ]
})

export { handler as GET, handler as POST }