import { demoUser, User } from "@/data/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- User-Storage-Key ---------- */
const USER_KEY = "demo_user";

/* ---------- User laden ---------- */
export async function loadUser(): Promise<User> {
  const stored = await AsyncStorage.getItem(USER_KEY); // gespeicherten User parsen
  return stored ? JSON.parse(stored) : demoUser; // Fallback bei Erststart
}

/* ---------- User speichern ---------- */
export async function saveUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}