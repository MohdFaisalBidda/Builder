"use server"

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schema/form";
import { getUserId } from "@/services/useUserId";
import { Form } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

class UserNotFoundErr extends Error { }


export async function GetFormStats() {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    console.log(typeof userId);

    if (!userId) {
        redirect("/login")
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
        redirect("/login")
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
        redirect("/login")
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
        redirect("/login")
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


export async function UpdateFormContent(id: number, jsonElements: string) {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        redirect("/login")
    }

    return await prisma.form.update({
        where: {
            userId: userId,
            id
        },
        data: {
            content: jsonElements
        }
    })
}

export async function PublishedForm(id: number) {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        redirect("/login")
    }

    return await prisma.form.update({
        where: {
            userId: userId,
            id
        },
        data: {
            published: true
        }
    })
}

export async function GetFromContentByURL(formURL: string) {
    return await prisma.form.update({
        select: {
            content: true
        },
        data: {
            visits: {
                increment: 1
            }
        },
        where: {
            shareURL: formURL
        }
    })
}

export async function SubmitForm(formURL: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {
                increment: 1
            },
            FormSubmissions: {
                create: {
                    content
                }
            }
        },
        where: {
            shareURL: formURL,
            published: true
        }
    })
}

export async function GetFromWithSubmissions(id: number) {
    const session: Session | null = await getServerSession();
    const userId = await getUserId(session?.user?.email);
    if (!userId) {
        redirect("/login")
    }

    return await prisma.form.findUnique({
        where: {
            userId: userId,
            id
        },
        include: {
            FormSubmissions: true
        }
    })
}