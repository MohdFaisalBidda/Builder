import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
                const response = await sql`
                SELECT * FROM "User" WHERE email=${credentials?.email}`;
                const user = response.rows[0];
                const passwordCorrect = await compare(credentials?.password || "", user.password)
                console.log({ passwordCorrect });
                if (passwordCorrect) {
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                }

                // Return null if user data could not be retrieved
                return null
            }
        })
    ]
})

export { handler as GET, handler as POST }