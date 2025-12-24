import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    //parse request
    const { name, email, password } = (await req.json()) as Body

    //validate input
    if (!name || !email || !password) {
        return NextResponse.json({ error: "Nedostaju podaci" }, { status: 400 })
    }

    //check database for user
    const exists = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (exists.length) {
        return NextResponse.json({ error: "Email postoji u bazi" }, { status: 400 })
    }

    // password
    const passHash = await bcrypt.hash(password, 10)

    //write to database
    const [u] = await db.insert(usersTable)
        .values({ name, email, passHash })
        .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email })

    //create/sign JWT
    const token = signAuthToken({ sub: u.id, email: u.email, name: u.name })

    //set cookie
    const res = NextResponse.json(u)
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    //return user data - response
    return res;

}