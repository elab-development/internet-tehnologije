import { db } from "@/db"
import { decks } from "@/db/schema"
import { eq, isNull } from "drizzle-orm"

export interface DeckDto {
    id: string
    name: string
    subjectId: string
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const subjectId = searchParams.get("subjectId")

    const whereClause = subjectId ? eq(decks.subjectId, subjectId) : isNull(decks.subjectId)

    const data: DeckDto[] = await db
        .select({ id: decks.id, name: decks.name, subjectId: decks.subjectId })
        .from(decks)
        .where(subjectId ? whereClause : undefined)
        .orderBy(decks.name)

    return Response.json(data)
}