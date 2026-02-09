import { DailyProgress } from "../types/progress";

/* ---------- Date Helpers ---------- */

export function toISODate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export function addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

/* ---------- Progress Logic ---------- */

// Letzte 7 Tage (immer inkl. heute)
export function buildLast7DaysSeries(
    daily: DailyProgress[],
    today = new Date()
): DailyProgress[] {
    const map = new Map<string, number>();
    daily.forEach((d) => map.set(d.date, d.minutes));

    return Array.from({ length: 7 }, (_, i) => {
        const d = addDays(today, i - 6);
        const iso = toISODate(d);
        return {
            date: iso,
            minutes: map.get(iso) ?? 0,
        };
    });
}

// Streak rückwärts ab heute
export function computeStreak(daily: DailyProgress[]): number {
    const map = new Map(daily.map((d) => [d.date, d.minutes]));
    let streak = 0;

    for (let i = 0; ; i++) {
        const iso = toISODate(addDays(new Date(), -i));
        const minutes = map.get(iso) ?? 0;
        if (minutes > 0) streak++;
        else break;
    }

    return streak;
}

// Summe Minuten (z. B. letzte 7 Tage)
export function sumMinutes(days: DailyProgress[]): number {
    return days.reduce((acc, d) => acc + d.minutes, 0);
}
