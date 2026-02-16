/* ---------- Tagesaggregat ---------- */
// Repräsentiert die gesamte Lernzeit eines Kalendertages.
export type DailyProgress = {
    date: string; // ISO-Datum "YYYY-MM-DD"
    minutes: number; // Summierte Lernminuten dieses Tages
};

/* ---------- Einzelner Übungsversuch ---------- */
// Speichert einen beantworteten Vokabel-Versuch.
export type VocabAttempt = {
    id: string; // Eindeutige Attempt-ID
    exerciseId: string; // Referenz auf Exercise.id
    chosenAnswerId: string; // Gewählte Antwort-ID ("a".."d")
    completedAt: string; // ISO-Zeitstempel der Bearbeitung
    minutes?: number; // Optional: Dauer dieses Versuchs (Default 0.5)
};

/* ---------- Persistenter Progress-Store ---------- */
// Wird pro User in AsyncStorage gespeichert.
export type ProgressStore = {
    attempts: VocabAttempt[]; // Alle gespeicherten Übungsversuche
};
