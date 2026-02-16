import { VocabAttempt, DailyProgress } from "@/types/progress";

function toISODate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

export function computeTotalMinutes(attempts: VocabAttempt[]) {
    return attempts.reduce((sum, a) => sum + (a.minutes ?? 0), 0);
}

export function computeStats(attempts: VocabAttempt[]) {
    return {
        completed: attempts.length,
    };
}

export function buildLast7DaysDailyFromAttempts(
    attempts: VocabAttempt[],
    today = new Date()
): DailyProgress[] {
    const minutesByDate = new Map<string, number>();

    for (const a of attempts) {
        const date = toISODate(new Date(a.completedAt));
        minutesByDate.set(date, (minutesByDate.get(date) ?? 0) + (a.minutes ?? 0));
    }

    // ältester links, heute rechts
    return Array.from({ length: 7 }, (_, i) => {
        const d = addDays(today, i - 6);
        const iso = toISODate(d);
        return {
            date: iso,
            minutes: minutesByDate.get(iso) ?? 0,
        };
    });
}

export function computeStreak(attempts: VocabAttempt[]) {
    const minutesByDate = new Map<string, number>();

    for (const a of attempts) {
        const date = toISODate(new Date(a.completedAt));
        minutesByDate.set(date, (minutesByDate.get(date) ?? 0) + (a.minutes ?? 0));
    }

    let streak = 0;

    for (let i = 0; i < 365; i++) {
        const d = addDays(new Date(), -i);
        const iso = toISODate(d);
        const minutes = minutesByDate.get(iso) ?? 0;

        if (minutes > 0) streak++;
        else break;
    }

    return streak;
}
