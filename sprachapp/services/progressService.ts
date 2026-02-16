import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressStore, VocabAttempt } from "@/types/progress";

/* ---------- Storage-Key pro User ---------- */
function keyFor(userId: string) {
  return `progress:${userId}`;
}

/* ---------- Progress laden ---------- */
export async function loadProgress(userId: string): Promise<ProgressStore> {
  const raw = await AsyncStorage.getItem(keyFor(userId));
  if (!raw) return { attempts: [] };

  const parsed = JSON.parse(raw) as any;

  return {
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [], // defensive Validierung
  };
}

/* ---------- Progress speichern ---------- */
export async function saveProgress(
    userId: string,
    store: ProgressStore
): Promise<void> {
  await AsyncStorage.setItem(keyFor(userId), JSON.stringify(store));
}

/* ---------- Attempt-Input Typ ---------- */
export type RecordAttemptInput = {
  exerciseId: string;
  chosenAnswerId: string;
  minutes?: number; // optional, Default 0.5
  completedAt?: string; // optional, Default jetzt
};

/* ---------- Attempt speichern ---------- */
export async function recordVocabAttempt(
    userId: string,
    input: RecordAttemptInput
): Promise<ProgressStore> {
  const store = await loadProgress(userId);

  const completedAt = input.completedAt ?? new Date().toISOString(); // Default: jetzt
  const minutes = input.minutes ?? 0.5; // Default: 0.5 Minuten pro Aufgabe

  const attempt: VocabAttempt = {
    id: `${Date.now()}`, // einfache Zeit-basierte ID
    exerciseId: input.exerciseId,
    chosenAnswerId: input.chosenAnswerId,
    completedAt,
    minutes,
  };

  store.attempts = [attempt, ...(store.attempts ?? [])]; // neues Attempt vorne einfügen

  await saveProgress(userId, store);
  return store;
}
