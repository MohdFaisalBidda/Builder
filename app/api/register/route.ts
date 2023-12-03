import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: any) {
    try {
        // TODO: Validate fields 
        const { username, email, password } = await request.json()
        console.log({ email, password });
        const hashedPass = await hash(password, 10)
        const response = await sql`
        INSERT INTO "User" (username,email,password) VALUES (${username},${email},${hashedPass})
        `
        console.log(response);

    } catch (error) {
        console.log("error",{error});

    }

    return NextResponse.json({ message: "success" })
}