import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressStore, VocabAttempt } from "@/types/progress";

function keyFor(userId: string) {
  return `progress:${userId}`;
}

export async function loadProgress(userId: string): Promise<ProgressStore> {
  const raw = await AsyncStorage.getItem(keyFor(userId));
  if (!raw) return { attempts: [] };

  const parsed = JSON.parse(raw) as any;

  return {
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
  };
}

export async function saveProgress(
    userId: string,
    store: ProgressStore
): Promise<void> {
  await AsyncStorage.setItem(keyFor(userId), JSON.stringify(store));
}

export type RecordAttemptInput = {
  exerciseId: string;
  chosenAnswerId: string;
  minutes?: number;
  completedAt?: string;
};

export async function recordVocabAttempt(
    userId: string,
    input: RecordAttemptInput
): Promise<ProgressStore> {
  const store = await loadProgress(userId);

  const completedAt = input.completedAt ?? new Date().toISOString();
  const minutes = input.minutes ?? 0.5;

  const attempt: VocabAttempt = {
    id: `${Date.now()}`,
    exerciseId: input.exerciseId,
    chosenAnswerId: input.chosenAnswerId,
    completedAt,
    minutes,
  };

  store.attempts = [attempt, ...(store.attempts ?? [])];

  await saveProgress(userId, store);
  return store;
}
