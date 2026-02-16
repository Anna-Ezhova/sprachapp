import { VocabAttempt, DailyProgress } from "@/types/progress";

/* ---------- Date Helpers ---------- */
// Wandelt ein Date-Objekt in "YYYY-MM-DD" um.
function toISODate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

// Addiert/Subtrahiert Tage auf ein Datum.
function addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

/* ---------- Gesamtminuten berechnen ---------- */
export function computeTotalMinutes(attempts: VocabAttempt[]) {
    return attempts.reduce((sum, a) => sum + (a.minutes ?? 0), 0);
}

/* ---------- Daily-Aggregation (7 Tage) ---------- */
// Baut aus Attempts ein DailyProgress-Array für die letzten 7 Tage.
export function buildLast7DaysDailyFromAttempts(
    attempts: VocabAttempt[],
    today = new Date()
): DailyProgress[] {
    const minutesByDate = new Map<string, number>();

    // Minuten pro Datum aggregieren
    for (const a of attempts) {
        const date = toISODate(new Date(a.completedAt));
        minutesByDate.set(date, (minutesByDate.get(date) ?? 0) + (a.minutes ?? 0));
    }

    // 7 Tage: ältester links, heute rechts
    return Array.from({ length: 7 }, (_, i) => {
        const d = addDays(today, i - 6);
        const iso = toISODate(d);
        return {
            date: iso,
            minutes: minutesByDate.get(iso) ?? 0,
        };
    });
}

/* ---------- Streak-Berechnung ---------- */
// Zählt aufeinanderfolgende Tage rückwärts ab heute mit >0 Minuten.
export function computeStreak(attempts: VocabAttempt[]) {
    const minutesByDate = new Map<string, number>();

    // Minuten pro Datum aggregieren
    for (const a of attempts) {
        const date = toISODate(new Date(a.completedAt));
        minutesByDate.set(date, (minutesByDate.get(date) ?? 0) + (a.minutes ?? 0));
    }

    let streak = 0;

    for (let i = 0; ; i++) {
        const d = addDays(new Date(), -i);
        const iso = toISODate(d);
        const minutes = minutesByDate.get(iso) ?? 0;

        if (minutes > 0) streak++; // Tag mit Aktivität → Streak erhöhen
        else break; // Erster Pausentag → Abbruch
    }

    return streak;
}
