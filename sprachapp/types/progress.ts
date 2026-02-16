export type DailyProgress = {
    date: string;        // "YYYY-MM-DD"
    minutes: number;     // Lernminuten an diesem Tag
};

export type VocabAttempt = {
    id: string;
    exerciseId: string;
    chosenAnswerId: string;
    completedAt: string;
    minutes?: number;
};

export type ProgressStore = {
    attempts: VocabAttempt[];
};
