import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    //parse request
    const { email, password } = (await req.json()) as Body

    //validate input
    if (!email || !password) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //check database for user
    const [u] = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (!u) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //compare password
    const ok = await bcrypt.compare(password, u.passHash)
    if (!ok) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //create/sign JWT
    const token = signAuthToken({ sub: u.id, email: u.email, name: u.name })

    //set cookie
    const res = NextResponse.json({ id: u.id, email: u.email, name: u.name })
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    //return user data - response
    return res;

}