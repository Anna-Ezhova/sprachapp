import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "use_demo_data";

export async function loadUseDemoData(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw === "true";
}

export async function saveUseDemoData(value: boolean): Promise<void> {
    await AsyncStorage.setItem(KEY, value ? "true" : "false");
}
