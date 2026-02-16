import { VocabAttempt } from "@/types/progress";

/* ---------- Demo-Daten: beantwortete Vokabel-Übungen ---------- */
/*
   Zeitraum: 04.02.2026 – 18.02.2026

   Zweck:
   - reproduzierbare Demo-Historie für Progress (Streak, Lernzeit, Weekly-Chart, letzte Versuche)
   - Demo soll realistisch wirken (nicht jeden Tag gelernt)

   Pausentage:
   - 06.02., 09.02., 11.02., 14.02.

   Hinweis zur Lernzeit:
   - Lernzeit wird aus Attempts berechnet (Summe der minutes-Felder).
   - Bei minutes=0.5 gilt: 20 Attempts = 10 Minuten, 60 Attempts = 30 Minuten.
   - Annahme: Exercise-IDs sind "1".."10", Answer-IDs sind "a".."d".
*/

export const demoVocabAttempts: VocabAttempt[] = [
    /* ---------- Manuell definierter Starttag (04.02.) ---------- */
    // Erste 20 Versuche sind ausgeschrieben, damit die Datei auch ohne Generator "lesbar" startet.
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

    /* ---------- Generierte Tage (via Helper) ---------- */

    ...makeDay("2026-02-05", 40, 100),

    // 2026-02-06: Pause

    ...makeDay("2026-02-07", 30, 200),

    ...makeDay("2026-02-08", 50, 300),

    // 2026-02-09: Pause

    ...makeDay("2026-02-10", 22, 400),

    // 2026-02-11: Pause

    ...makeDay("2026-02-12", 34, 500),

    ...makeDay("2026-02-13", 28, 600),

    // 2026-02-14: Pause

    ...makeDay("2026-02-15", 24, 700),

    ...makeDay("2026-02-16", 46, 800),

    ...makeDay("2026-02-17", 20, 900),

    ...makeDay("2026-02-18", 60, 1000),
];

/* ---------- Helper: Attempts für einen Tag generieren ---------- */
/*
   Erzeugt N Versuche am gegebenen Datum.
   - offset sorgt für eindeutige IDs (damit Keys/Listen stabil bleiben)
   - exerciseId rotiert zyklisch über 1..10 (damit alle Aufgaben vorkommen)
   - chosenAnswerId rotiert zyklisch über a..d (bewusst simpel, reicht für Demo)
   - Zeitstempel variiert leicht, damit nicht alle Attempts identisch wirken
*/

function makeDay(date: string, count: number, offset: number): VocabAttempt[] {
    const answerIds = ["a", "b", "c", "d"] as const;
    const attempts: VocabAttempt[] = [];

    for (let i = 0; i < count; i++) {
        const n = offset + i;
        const exerciseId = String((i % 10) + 1);
        const chosenAnswerId = answerIds[i % answerIds.length];

        /* ---------- Pseudo-verteilte Uhrzeit ---------- */
        // Keine echte Randomness: deterministisch, damit Demo reproduzierbar bleibt.
        const hh = String(10 + Math.floor(i / 12)).padStart(2, "0");
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
