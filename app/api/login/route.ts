import { NextResponse } from "next/server";
import { compare, hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/router";
import prisma from "@/lib/prisma";
export const dynamic = 'force-dynamic' 
export async function GET(request: any) {
    const router = useRouter()
    try {
        // TODO: Validate fields 
        const { email, password } = await request.json()
        console.log({ email, password });
        // const hashedPass = await hash(password, 10)

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            console.error("User not found")
        } else {
            // const user = response.rows[0];
            const passwordCorrect = await compare(password || "", user.password)
            if (passwordCorrect) {
                router.push("/")
            } else {
                console.error("Incorrect Password")
            }
        }
    } catch (error) {
        console.log("error", { error });

    }

    return NextResponse.json({ message: "success" })
}
