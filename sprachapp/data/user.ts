/* ---------- Typdefinition: User ---------- */
export type User = {
  id: string;
  name: string;
  progress: {
    completedExercises: number; // Anzahl beantworteter Fragen
    correctAnswers: number; // Anzahl korrekt beantworteter Fragen
    daysInRow: number; // Lernstreak (aufeinanderfolgende Tage)
    vocabsLearned: number; // Anzahl gelernter Vokabeln
  };
};

/* ---------- Demo-Nutzer ---------- */

export const demoUser = {
  id: "demo-user-1",
  name: "Max Mustermann",
  progress: {
    completedExercises: 0,
    correctAnswers: 0,
    daysInRow: 0,
    vocabsLearned: 0
  },
};