import { useState } from "react";
import { exercises } from "../data/exercises";
// import { ExerciseController } from "@/logic/ExerciseController";
import { User } from "@/data/user";
import { ExerciseController } from "@/logic/ExersiseController";

/**
 * Hook useExersise is responsible for managing exersises on the ExersiseScreen
 *
 * @param user 
 * @returns 
 */

export function useExercise(user: User) {

 
  const [controller] = useState(
    () => new ExerciseController(exercises, user)
  );

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  //Loading exersise using controller

  const exercise = controller.getExercise(currentIndex);

  //Select answer

  function selectAnswer(answerId: string) {
    setSelectedAnswer(answerId);
  }


  //Feedback after the answer was chosen

  function checkAnswer() {
    if (!selectedAnswer) return;

    const result = controller.submitAnswer(selectedAnswer);
    setIsCorrect(result);
    setShowFeedback(true);
  }

  //Provides the next exersise if there is one, otherwise displays the results of the test

  function next() {
    setSelectedAnswer(null);
    setShowFeedback(false);
    

    if (controller.hasNext(currentIndex)) {
      setCurrentIndex((i) => i + 1)
    } else {
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