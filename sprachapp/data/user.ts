export type User = {
  id: string;
  name: string;
  progress: {
    completedExercises: number;
    correctAnswers: number;
  };
};

export const demoUser = {
  id: "demo-user-1",
  name: "Max Mustermann",
  progress: {
    completedExercises: 0,
    correctAnswers: 0,
    daysinRow: 0,
    vocabsLearned: 0
  },
};