import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "use_demo_data"; // AsyncStorage-Key für Demo-Flag

/* ---------- Demo-Flag laden ---------- */
// Liest aus AsyncStorage, ob Demo-Daten aktiv sind.
export async function loadUseDemoData(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw === "true"; // nur exakter String "true" aktiviert Demo
}

/* ---------- Demo-Flag speichern ---------- */
// Persistiert den Demo-Toggle als String.
export async function saveUseDemoData(value: boolean): Promise<void> {
    await AsyncStorage.setItem(KEY, value ? "true" : "false");
}
