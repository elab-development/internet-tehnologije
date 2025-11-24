export interface FullDeckDto {
    id: number;
    name: string;
    createdAt: Date;
    subject: {
        id: string;
        name: string;
        createdAt: Date;
    };
    cardsCount: number;
}

export interface FullSubjectDto {
    id: string;
    name: number;
}