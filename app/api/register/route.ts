import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import prisma from "@/lib/prisma";

export async function POST(request: any) {
    try {
        // TODO: Validate fields 
        const { username, email, password } = await request.json()
        console.log({ email, password });
        const hashedPass = await hash(password, 10)
        const response = await prisma.user.create({
            data: {
                username, email, password: hashedPass
            }
        })
        console.log("From Register Route", response);

    } catch (error) {
        console.log("error", { error });

    }

    return NextResponse.json({ message: "success" })
}