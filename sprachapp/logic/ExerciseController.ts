import { Exercise } from "@/data/exercises";
import { User } from "@/data/user";
import { saveUser } from "@/services/userService";
import { recordVocabAttempt } from "@/services/progressService";

export class ExerciseController {

  /* ---------- Interner Zustand ---------- */
  private currentIndex = 0;
  private correctAnswers = 0;

  constructor(private exercises: Exercise[], private user: User) {}

  /* ---------- Aktuelle Aufgabe ---------- */
  getCurrentExercise(): Exercise {
    return this.exercises[this.currentIndex];
  }

  /* ---------- Antwort verarbeiten ---------- */
  async submitAnswer(answerId: string): Promise<boolean> {
    const current = this.getCurrentExercise();

    const isCorrect = answerId === current.correctAnswerId;

    this.user.progress.completedExercises++;

    if (isCorrect) {
      this.correctAnswers++;
      this.user.progress.correctAnswers++;
    }

    await saveUser(this.user); // User-Fortschritt persistieren

    await recordVocabAttempt(this.user.id, {
      exerciseId: current.id,
      chosenAnswerId: answerId,
      minutes: 0.5,
    });

    return isCorrect;
  }

  /* ---------- Zur nächsten Aufgabe wechseln ---------- */
  next(): boolean {
    this.currentIndex++;
    return this.currentIndex < this.exercises.length;
  }

  /* ---------- Ergebnis des Trainings ---------- */
  getResult() {
    return { total: this.exercises.length, correct: this.correctAnswers };
  }
}
