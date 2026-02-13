export type Exercise = {
  id: string;
  question: string;
  prompt: string;
  answers: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
};

export const exercises: Exercise[] = [
  {
    id: "1",
    question: "Wie heißt das auf Deutsch?",
    prompt: "apple",
    answers: [
      { id: "a", text: "Apfel" },
      { id: "b", text: "Banane" },
      { id: "c", text: "Orange" },
      { id: "d", text: "Birne" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "2",
    question: "Wie heißt das auf Deutsch?",
    prompt: "house",
    answers: [
      { id: "a", text: "Haus" },
      { id: "b", text: "Auto" },
      { id: "c", text: "Baum" },
      { id: "d", text: "Stuhl" },
    ],
    correctAnswerId: "a",
  },
];