"use client";

import { useState, useEffect } from "react";
import { mockDecks, mockSubjects } from "@/mock/data";
import { FullSubjectDto, FullDeckDto } from "@/shared/types";
import Card from "./Card";
import Sidebar from "./Sidebar";

type Props = { subjects: FullSubjectDto[] }

export default function DeckBrowser({ subjects }: Props) {

    const [decks, setDecks] = useState<FullDeckDto[]>(mockDecks);
    const [search, setSearch] = useState("");
    const [subjectId, setSubjectId] = useState<number | null>(null);

    useEffect(() => {
        console.log(search);
        let data = mockDecks;

        if (subjectId !== null) data = data.filter(d => d.subject.id === subjectId);
        if (search.trim()) {
            data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
        }
        setDecks(data);

    }, [subjectId, search]);

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