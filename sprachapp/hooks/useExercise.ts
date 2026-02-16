import { useState, useRef } from "react";
import { exercises } from "@/data/exercises";
import { User } from "@/data/user";
import { ExerciseController } from "@/logic/ExerciseController";

export function useExercise(user: User) {

  /* ---------- Controller-Initialisierung ---------- */
  const controllerRef = useRef<ExerciseController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new ExerciseController(exercises, user);
  }

  const controller = controllerRef.current;

  /* ---------- UI-Zustände ---------- */
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const exercise = controller.getCurrentExercise();

  /* ---------- Auswahl setzen ---------- */
  function selectAnswer(answerId: string) {
    setSelectedAnswer(answerId);
  }

  /* ---------- Antwort prüfen ---------- */
  async function checkAnswer() {
    if (!selectedAnswer) return;

    const result = await controller.submitAnswer(selectedAnswer);
    setIsCorrect(result);
    setShowFeedback(true);
  }

  /* ---------- Nächste Aufgabe ---------- */
  function next() {
    setSelectedAnswer(null);
    setShowFeedback(false);

    const hasNext = controller.next();
    if (!hasNext) {
      setFinished(true);
    }
  }

  /* ---------- Rückgabe an UI ---------- */
  return {
    exercise,
    selectedAnswer,
    showFeedback,
    isCorrect,
    finished,
    selectAnswer,
    checkAnswer,
    next,
    result: finished ? controller.getResult() : null,
  };
}