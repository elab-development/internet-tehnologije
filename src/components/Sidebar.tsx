import { FullSubjectDto } from "@/shared/types";
import FilterBtn from "./FilterBtn";

type Props = {
    search: string;
    setSearch: (value: string) => void;
    subjectId: number | null;
    setSubjectId: (value: number | null) => void;
    subjects: FullSubjectDto[];
};

export default function Sidebar({ search, setSearch, subjectId, setSubjectId, subjects }: Props) {
    return (
        <aside className="w-full md:w-64 shrink-0" >
            <div className="flex flex-col gap-4 md:sticky md:top-20">
                {/* Search */}
                <input type="text" placeholder="Pretraga spilova"
                    className="w-full rounded border border-gray-200 px-3 py-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* Subject filter buttons */}
                <div className="flex flex-wrap gap-2 md:flex-col">
                    <FilterBtn
                        active={subjectId === null}
                        handleClick={() => setSubjectId(null)}
                    >
                        Svi predmeti
                    </FilterBtn>
                    {subjects.map((s) => (
                        <FilterBtn
                            key={s.id}
                            active={subjectId === s.id}
                            handleClick={() => setSubjectId(s.id)}
                        >
                            {s.name}
                        </FilterBtn>
                    ))}
                </div>

            </div>
        </aside>
    )
}