"use server"

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schema/form";
import { getUserId } from "@/services/useUserId";
import { Form } from "@prisma/client";
import { Session, getServerSession } from "next-auth";

class UserNotFoundErr extends Error { }


export async function GetFormStats() {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    console.log(typeof userId);

    if (!userId) {
        throw new UserNotFoundErr;
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: userId,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissionRate / visits) * 100
    }

    return { visits, submissions, submissionRate }

}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Form is not valid")
    }

    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        throw new UserNotFoundErr;
    }

    const { name, description } = data;

    const form = await prisma.form.create({
        data: {
            userId: userId,
            name,
            description
        } as any
    })

    if (!form) {
        throw new Error("Something went wrong")
    }

    return form.id;
}


export async function GetForms() {

    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        throw new UserNotFoundErr;
    }

    try {
        return await prisma.form.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } catch (error) {
        console.log(error);

    }

}

export async function getFormById(id: number) {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        throw new UserNotFoundErr;
    }

    try {
        return await prisma.form.findUnique({
            where: {
                userId: userId,
                id
            }
        })
    } catch (error) {
        console.log(error);

    }
}