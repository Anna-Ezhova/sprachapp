import { useState, useRef } from "react";
import { exercises } from "@/data/exercises";
import { User } from "@/data/user";
import { ExerciseController } from "@/logic/ExerciseController";

export function useExercise(user: User) {

  console.log(user)
  const controllerRef = useRef<ExerciseController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new ExerciseController(exercises, user);
  }

  const controller = controllerRef.current;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const exercise = controller.getCurrentExercise();

  function selectAnswer(answerId: string) {
    setSelectedAnswer(answerId);
  }

  async function checkAnswer() {
    if (!selectedAnswer) return;

    const result = await controller.submitAnswer(selectedAnswer);
    setIsCorrect(result);
    setShowFeedback(true);
  }

  function next() {
    setSelectedAnswer(null);
    setShowFeedback(false);

    const hasNext = controller.next();
    if (!hasNext) {
      setFinished(true);
    }
  }

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