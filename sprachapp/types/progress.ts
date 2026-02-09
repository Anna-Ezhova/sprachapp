export type DailyProgress = {
    date: string;        // "YYYY-MM-DD"
    minutes: number;     // gelernte Minuten an diesem Tag
};

export type RecentActivity = {
    id: string;
    title: string;       // Titel der Übung
    subtitle?: string;   // Themengebiet
    completedAt: string; // ISO-Datum/Zeit
};

export type ProgressSummary = {
    language: string;
    xp: number;
    completedExercises: number;
    recent: RecentActivity[];
};
