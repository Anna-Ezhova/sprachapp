import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <Link href="/exercise" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Training starten</Text>
                </Pressable>
            </Link>
            <Link href="/progress" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Fortschritt öffnen</Text>
                </Pressable>
            </Link>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: "#111",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "700",
    },
});
