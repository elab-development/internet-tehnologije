import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE)?.value
    if (!token) {
        return NextResponse.json({ user: null })
    }

    try {
        const claims = verifyAuthToken(token);
        const [u] = await db
            .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email, createdAt: usersTable.createdAt })
            .from(usersTable)
            .where(eq(usersTable.id, claims.sub))

        return NextResponse.json({ user: u ?? null })
    } catch {
        return NextResponse.json({ user: null }, { status: 401 })
    }
}