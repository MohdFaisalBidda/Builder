import { NextResponse } from "next/server";

export async function POST(request:any) {
    try {
        // TODO: Validate fields 
        const { email, password } = await request.json()
        console.log({ email, password });

    } catch (error) {
        console.log({ error });

    }

    return NextResponse.json({ message: "success" })
}