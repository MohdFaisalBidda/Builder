import { NextResponse } from "next/server";
import { compare, hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/navigation";

export async function GET(request: any) {
    const router = useRouter()
    try {
        // TODO: Validate fields 
        const { email, password } = await request.json()
        console.log({ email, password });
        const hashedPass = await hash(password, 10)
        const response = await sql`SELECT * FROM "User" WHERE email=${email}`;
        const user = response.rows[0];
        const passwordCorrect = await compare(password || "", user.password)
        if (passwordCorrect) {
            router.push("/")
        }

    } catch (error) {
        console.log("error", { error });

    }

    return NextResponse.json({ message: "success" })
}