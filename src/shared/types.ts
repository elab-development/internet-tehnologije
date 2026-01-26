export interface FullDeckDto {
    id: string;
    name: string;
    createdAt: Date;
    subjectId: string
    cardsCount: number;
}

export interface FullSubjectDto {
    id: string;
    name: string;
    createdAt: Date;
}