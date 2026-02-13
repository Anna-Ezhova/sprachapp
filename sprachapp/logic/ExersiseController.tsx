import { Exercise } from "@/data/exercises";
import { User } from "@/data/user";
import { saveUser } from "@/services/userService";

export class ExerciseController {
  private currentIndex = 0;
  private correctAnswers = 0;

  constructor(
    private exercises: Exercise[],
    private user: User
  ) {}

  
  getCurrentExercise(): Exercise {
    return this.exercises[this.currentIndex];
  }

  submitAnswer(answerId: string): boolean {
    const isCorrect =
      answerId === this.getCurrentExercise().correctAnswerId;

    this.user.progress.completedExercises++;

    if (isCorrect) {
      this.correctAnswers++;
      this.user.progress.correctAnswers++;
    }

    saveUser(this.user);
    return isCorrect;
  }

  next(): boolean {
    this.currentIndex++;
    return this.currentIndex < this.exercises.length;
  }

  getResult() {
    return {
      total: this.exercises.length,
      correct: this.correctAnswers,
    };
  }

  isFinished(): boolean {
    return this.currentIndex >= this.exercises.length;
  }
}