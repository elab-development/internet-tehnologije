
import { db } from "./index"
import { usersTable } from "./schema"
import bcrypt from "bcrypt"

const hash = await bcrypt.hash("1234", 10)

await db.transaction(async (tx) => {
    await tx.insert(usersTable).values([
        {
            id: "042cf80d-2495-4ad5-8bcd-1aa90fb9a46e",
            name: "Petar Petrovic",
            email: "petarp@gmail.com",
            passHash: hash
        },
        {
            id: "042cf80d-2495-4ad5-8bcd-1aa90fb9a46a",
            name: "Marko Petrovic",
            email: "markop@gmail.com",
            passHash: hash
        },
        {
            id: "042cf80d-2495-4ad5-8bcd-1aa90fb9a46b",
            name: "Jovana Petrovic",
            email: "jovanap@gmail.com",
            passHash: hash
        }
    ])
})