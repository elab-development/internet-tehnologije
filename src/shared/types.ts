export interface FullDeckDto {
    id: number;
    name: string;
    createdAt: Date;
    subject: {
        id: number;
        name: string;
        createdAt: Date;
    };
    cardsCount: number;
}

export interface FullSubjectDto {
    id: number;
    name: string;
    createdAt: Date;
}