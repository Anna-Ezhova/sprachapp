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
    question: "Wie lautet die deutsche Übersetzung für dieses Wort?",
    prompt: "Woman",
    answers: [
      { id: "a", text: "die Frau" },
      { id: "b", text: "der Mann" },
      { id: "c", text: "das Kind" },
      { id: "d", text: "der Onkel" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "2",
    question: "Wie lautet die deutsche Übersetzung für dieses Wort?",
    prompt: "Child",
    answers: [
      { id: "a", text: "der Mann" },
      { id: "b", text: "das Kind" },
      { id: "c", text: "die Frau" },
      { id: "d", text: "der Onkel" },
    ],
    correctAnswerId: "b",
  },
  {
    id: "3",
    question: "Wie lautet die englische Übersetzung für dieses Wort?",
    prompt: "der Mann",
    answers: [
      { id: "a", text: "Man" },
      { id: "b", text: "Woman" },
      { id: "c", text: "Child" },
      { id: "d", text: "Baby" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "4",
    question: "Wie lautet die englische Übersetzung für dieses Wort?",
    prompt: "das Mädchen",
    answers: [
      { id: "a", text: "Woman" },
      { id: "b", text: "Man" },
      { id: "c", text: "Girl" },
      { id: "d", text: "Boy" },
    ],
    correctAnswerId: "c",
  },
  {
    id: "5",
    question: "Wie lautet die englische Übersetzung für dieses Wort?",
    prompt: "der Junge",
    answers: [
      { id: "a", text: "Child" },
      { id: "b", text: "Baby" },
      { id: "c", text: "Girl" },
      { id: "d", text: "Boy" },
    ],
    correctAnswerId: "d",
  },
  {
    id: "6",
    question: "Vervollständige den Satz",
    prompt: "The boy and the girl are ____ ",
    answers: [
      { id: "a", text: "childs" },
      { id: "b", text: "children" },
      { id: "c", text: "men" },
      { id: "d", text: "child" },
    ],
    correctAnswerId: "b",
  },
  {
    id: "7",
    question: "Vervollständige den Satz",
    prompt: "The man and the woman have a ____ together.",
    answers: [
      { id: "a", text: "childs" },
      { id: "b", text: "children" },
      { id: "c", text: "men" },
      { id: "d", text: "child" },
    ],
    correctAnswerId: "d",
  },
  {
    id: "8",
    question: "Vervollständige den Satz",
    prompt: "She isn't a ___ she's already a ___ ",
    answers: [
      { id: "a", text: "child, man" },
      { id: "b", text: "woman, child" },
      { id: "c", text: "child, woman" },
      { id: "d", text: "man, child" },
    ],
    correctAnswerId: "c",
  },
  {
    id: "9",
    question: "Wie lautet die deutsche Übersetzung für dieses Wort?",
    prompt: "Girl",
    answers: [
      { id: "a", text: "das Mädchen" },
      { id: "b", text: "der Junge" },
      { id: "c", text: "die Frau" },
      { id: "d", text: "das Baby" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "10",
    question: "Wie lautet die deutsche Übersetzung für dieses Wort?",
    prompt: "Children",
    answers: [
      { id: "a", text: "das Baby" },
      { id: "b", text: "das Kind" },
      { id: "c", text: "die Kinder" },
      { id: "d", text: "die Babys" },
    ],
    correctAnswerId: "c",
  }
];