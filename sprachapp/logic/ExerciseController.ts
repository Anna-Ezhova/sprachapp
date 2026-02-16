import { Exercise } from "@/data/exercises";
import { User } from "@/data/user";
import { saveUser } from "@/services/userService";
import { recordVocabAttempt } from "@/services/progressService";

export class ExerciseController {
  private currentIndex = 0;
  private correctAnswers = 0;

  constructor(private exercises: Exercise[], private user: User) {}

  getCurrentExercise(): Exercise {
    return this.exercises[this.currentIndex];
  }

  async submitAnswer(answerId: string): Promise<boolean> {
    const current = this.getCurrentExercise();

    const isCorrect = answerId === current.correctAnswerId;

    this.user.progress.completedExercises++;

    if (isCorrect) {
      this.correctAnswers++;
      this.user.progress.correctAnswers++;
    }

    await saveUser(this.user);

    await recordVocabAttempt(this.user.id, {
      exerciseId: current.id,
      chosenAnswerId: answerId,
      minutes: 0.5,
    });

    return isCorrect;
  }

  next(): boolean {
    this.currentIndex++;
    return this.currentIndex < this.exercises.length;
  }

  getResult() {
    return { total: this.exercises.length, correct: this.correctAnswers };
  }
}
