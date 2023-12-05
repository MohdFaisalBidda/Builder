import { NextResponse } from "next/server";

export async function POST(request: any) {
    try {
        // TODO: Validate fields 
        const { username, email, password } = await request.json()
        console.log({ username, email, password });

    } catch (error) {
        console.log({ error });

    }

    return NextResponse.json({ message: "success" })
}