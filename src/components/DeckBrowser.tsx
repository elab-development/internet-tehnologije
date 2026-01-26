"use client";

import { useState, useEffect } from "react";
//import { mockDecks, mockSubjects } from "@/mock/data";
import { FullSubjectDto, FullDeckDto } from "@/shared/types";
import Card from "./Card";
import Sidebar from "./Sidebar";

type Props = { subjects: FullSubjectDto[] }

export default function DeckBrowser({ subjects }: Props) {

    const [decks, setDecks] = useState<FullDeckDto[]>([]);
    const [allDecks, setAllDecks] = useState<FullDeckDto[]>([]);
    const [search, setSearch] = useState("");
    const [subjectId, setSubjectId] = useState<string | null>(null);

    const loadDecks = async () => {
        const res = await fetch('/api/decks')
        const data = await res.json()

        setAllDecks(data)
        setDecks(data)
    }

    useEffect(() => {
        loadDecks()
    }, [])

    useEffect(() => {
        console.log(search);
        let data = allDecks;

        if (subjectId !== null) data = data.filter(d => d.subjectId === subjectId);
        if (search.trim()) {
            data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
        }
        setDecks(data);

    }, [subjectId, search, allDecks]);

    return (

        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* <p>Komponenta DeckBrowser je ovde</p> */}
                {/* Sidebar */}
                <Sidebar search={search} setSearch={setSearch} subjectId={subjectId} setSubjectId={setSubjectId} subjects={subjects} />

                {/* Cards */}
                <section className="flex-1">
                    {decks.length === 0 ? (
                        <p className="text-center text-gray-500"> Nema spilova </p>) :
                        (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {decks.map((deck, idx) => (
                                    <Card deck={deck} subjects={subjects} key={deck.id} />
                                ))}
                            </div>
                        )}
                </section>
            </div>
        </div>
    );
} 