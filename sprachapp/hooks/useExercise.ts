import { useState } from "react";
import { exercises } from "../data/exercises";
// import { ExerciseController } from "@/logic/ExerciseController";
import { User } from "@/data/user";
import { ExerciseController } from "@/logic/ExersiseController";

export function useExercise(user: User) {

  console.log(user)
  const [controller] = useState(
    () => new ExerciseController(exercises, user)
  );

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const exercise = controller.getCurrentExercise();

  function selectAnswer(answerId: string) {
    setSelectedAnswer(answerId);
  }

  function checkAnswer() {
    if (!selectedAnswer) return;

    const result = controller.submitAnswer(selectedAnswer);
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