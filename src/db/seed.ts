import { db } from "./index"
import { usersTable, subjects, decks } from "./schema"
import bcrypt from "bcrypt"

/*
const SUBJECT_IDS = {
    MAT1: "00000000-0000-0000-0000-000000000101",
    ECO: "00000000-0000-0000-0000-000000000102",
    MNG: "00000000-0000-0000-0000-000000000103",
    OIKT: "00000000-0000-0000-0000-000000000104",
    PSI: "00000000-0000-0000-0000-000000000105",
    SOC: "00000000-0000-0000-0000-000000000106",
    MKT: "00000000-0000-0000-0000-000000000107",
    OOR: "00000000-0000-0000-0000-000000000108",
    UIS: "00000000-0000-0000-0000-000000000109",
} as const;

const DECK_IDS = {
    ECO: "00000000-0000-0000-0000-000000000201",
    MNG: "00000000-0000-0000-0000-000000000202",
} as const;
 */

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
    ]).onConflictDoNothing()

    /*

    await tx.insert(subjects).values([
        { id: SUBJECT_IDS.MAT1, name: "Matematika 1" },
        { id: SUBJECT_IDS.ECO, name: "Ekonomija" },
        { id: SUBJECT_IDS.MNG, name: "Menadžment" },
        { id: SUBJECT_IDS.OIKT, name: "OIKT" },
        { id: SUBJECT_IDS.PSI, name: "Psihologija" },
        { id: SUBJECT_IDS.SOC, name: "Sociologija" },
        { id: SUBJECT_IDS.MKT, name: "Marketing" },
        { id: SUBJECT_IDS.OOR, name: "Osnovi organizacije" },
        { id: SUBJECT_IDS.UIS, name: "UIS" },
    ]).onConflictDoNothing();

    await tx.insert(decks).values([
        {
            id: DECK_IDS.ECO,
            name: "Osnovi ekonomije",
            subjectId: SUBJECT_IDS.ECO,
        },
        {
            id: DECK_IDS.MNG,
            name: "Osnove menadžmenta",
            subjectId: SUBJECT_IDS.MNG,
        },
    ]).onConflictDoNothing();
    */

})
