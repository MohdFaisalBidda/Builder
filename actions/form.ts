"use server"

import prisma from "@/lib/prisma";
import { formSchemaType } from "@/schema/form";
import { Session, getServerSession } from "next-auth";

class UserNotFoundErr extends Error { }

export async function GetFormStats() {
    const user: Session | null = await getServerSession();
    console.log(user, "session");
    if (user?.user?.email != undefined) {
        // throw new UserNotFoundErr;
    }

    const stats =await prisma.form.aggregate({
        where: {
            userId: user?.user?.email || "",
        },
        _sum:{
            visits:true,
            submissions:true
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

export async function CreateForm(data:formSchemaType){

}