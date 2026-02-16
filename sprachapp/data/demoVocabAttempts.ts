import { VocabAttempt } from "@/types/progress";

/**
 * Demo: 04.02.2026 – 18.02.2026
 * - Pausentage: 06, 09, 11, 14
 * - Daily-Minuten (aus Attempts * 0.5)
 *   20 bis 60 Attempts pro Lerntag
 *
 * Exercises IDs "1".."10", Answer IDs "a".."d"
 */

export const demoVocabAttempts: VocabAttempt[] = [
    // ===== 2026-02-04 =====
    { id: "d-2026-02-04-01", exerciseId: "1", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:00:00.000Z" },
    { id: "d-2026-02-04-02", exerciseId: "2", chosenAnswerId: "b", minutes: 0.5, completedAt: "2026-02-04T18:00:30.000Z" },
    { id: "d-2026-02-04-03", exerciseId: "3", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:01:00.000Z" },
    { id: "d-2026-02-04-04", exerciseId: "4", chosenAnswerId: "c", minutes: 0.5, completedAt: "2026-02-04T18:01:30.000Z" },
    { id: "d-2026-02-04-05", exerciseId: "5", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:02:00.000Z" },
    { id: "d-2026-02-04-06", exerciseId: "6", chosenAnswerId: "b", minutes: 0.5, completedAt: "2026-02-04T18:02:30.000Z" },
    { id: "d-2026-02-04-07", exerciseId: "7", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:03:00.000Z" },
    { id: "d-2026-02-04-08", exerciseId: "8", chosenAnswerId: "d", minutes: 0.5, completedAt: "2026-02-04T18:03:30.000Z" },
    { id: "d-2026-02-04-09", exerciseId: "9", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:04:00.000Z" },
    { id: "d-2026-02-04-10", exerciseId: "10", chosenAnswerId: "c", minutes: 0.5, completedAt: "2026-02-04T18:04:30.000Z" },
    { id: "d-2026-02-04-11", exerciseId: "1", chosenAnswerId: "b", minutes: 0.5, completedAt: "2026-02-04T18:05:00.000Z" },
    { id: "d-2026-02-04-12", exerciseId: "2", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:05:30.000Z" },
    { id: "d-2026-02-04-13", exerciseId: "3", chosenAnswerId: "d", minutes: 0.5, completedAt: "2026-02-04T18:06:00.000Z" },
    { id: "d-2026-02-04-14", exerciseId: "4", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:06:30.000Z" },
    { id: "d-2026-02-04-15", exerciseId: "5", chosenAnswerId: "c", minutes: 0.5, completedAt: "2026-02-04T18:07:00.000Z" },
    { id: "d-2026-02-04-16", exerciseId: "6", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:07:30.000Z" },
    { id: "d-2026-02-04-17", exerciseId: "7", chosenAnswerId: "b", minutes: 0.5, completedAt: "2026-02-04T18:08:00.000Z" },
    { id: "d-2026-02-04-18", exerciseId: "8", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:08:30.000Z" },
    { id: "d-2026-02-04-19", exerciseId: "9", chosenAnswerId: "c", minutes: 0.5, completedAt: "2026-02-04T18:09:00.000Z" },
    { id: "d-2026-02-04-20", exerciseId: "10", chosenAnswerId: "a", minutes: 0.5, completedAt: "2026-02-04T18:09:30.000Z" },

    // ===== 2026-02-05 (40 attempts => 20.0 min) =====
    ...makeDay("2026-02-05", 40, 100),

    // ===== 2026-02-06 PAUSE =====

    // ===== 2026-02-07 (30 attempts => 15.0 min) =====
    ...makeDay("2026-02-07", 30, 200),

    // ===== 2026-02-08 (50 attempts => 25.0 min) =====
    ...makeDay("2026-02-08", 50, 300),

    // ===== 2026-02-09 PAUSE =====

    // ===== 2026-02-10 (22 attempts => 11.0 min) =====
    ...makeDay("2026-02-10", 22, 400),

    // ===== 2026-02-11 PAUSE =====

    // ===== 2026-02-12 (34 attempts => 17.0 min) =====
    ...makeDay("2026-02-12", 34, 500),

    // ===== 2026-02-13 (28 attempts => 14.0 min) =====
    ...makeDay("2026-02-13", 28, 600),

    // ===== 2026-02-14 PAUSE =====

    // ===== 2026-02-15 (24 attempts => 12.0 min) =====
    ...makeDay("2026-02-15", 24, 700),

    // ===== 2026-02-16 (46 attempts => 23.0 min) =====
    ...makeDay("2026-02-16", 46, 800),

    // ===== 2026-02-17 (20 attempts => 10.0 min) =====
    ...makeDay("2026-02-17", 20, 900),

    // ===== 2026-02-18 (60 attempts => 30.0 min) =====
    ...makeDay("2026-02-18", 60, 1000),
];

/**
 * Helper zum Generieren von N Attempts an einem Datum.
 * - offset sorgt dafür, dass IDs eindeutig bleiben.
 * - verteilt exerciseId zyklisch über 1..10
 * - chosenAnswerId zyklisch über a..d
 */

function makeDay(date: string, count: number, offset: number): VocabAttempt[] {
    const answerIds = ["a", "b", "c", "d"] as const;
    const attempts: VocabAttempt[] = [];

    for (let i = 0; i < count; i++) {
        const n = offset + i;
        const exerciseId = String((i % 10) + 1); // "1".."10"
        const chosenAnswerId = answerIds[i % answerIds.length];

        // Uhrzeit minimal variieren
        const hh = String(10 + Math.floor(i / 12)).padStart(2, "0"); // ab 10:00
        const mm = String((i * 2) % 60).padStart(2, "0");
        const ss = String((i * 5) % 60).padStart(2, "0");

        attempts.push({
            id: `d-${date}-${n}`,
            exerciseId,
            chosenAnswerId,
            minutes: 0.5,
            completedAt: `${date}T${hh}:${mm}:${ss}.000Z`,
        });
    }

    return attempts;
}
