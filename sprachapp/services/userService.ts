import { demoUser, User } from "@/data/user";
import AsyncStorage from "@react-native-async-storage/async-storage";


const USER_KEY = "demo_user";



export async function loadUser(): Promise<User> {
  const stored = await AsyncStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : demoUser;
}

export async function saveUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}