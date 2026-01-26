import { db } from "@/db";
import { subjects } from "@/db/schema";
import { NextResponse } from "next/server";

export interface SubjectDto {
    id: string;
    name: string;
}


export async function GET() {
    const mySubjects = await db.select({ id: subjects.id, name: subjects.name }).from(subjects).orderBy(subjects.name)

    return NextResponse.json(mySubjects)
}