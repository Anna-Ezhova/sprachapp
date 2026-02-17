import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import { Button } from "@/components/ui/Button";
import { theme } from "@/theme/theme";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sprachlern-App</Text>
            <Text style={styles.subtitle}>
                Trainiere Vokabeln und verfolge deinen Fortschritt.
            </Text>

            <View style={styles.actions}>
                <Link href="/exercise" asChild>
                    <Button title="Training starten" style={styles.fullWidth} />
                </Link>

                <Link href="/progress" asChild>
                    <Button title="Fortschritt ansehen" variant="secondary" style={styles.fullWidth} />
                </Link>
            </View>

        </View>
    );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: theme.space.xl,
        backgroundColor: theme.colors.bg,
        gap: theme.space.lg,
    },

    title: {
        ...theme.text.title,
        textAlign: "center",
        color: theme.colors.text,
    },

    subtitle: {
        textAlign: "center",
        color: theme.colors.muted,
    },

    actions: {
        marginTop: theme.space.lg,
        gap: theme.space.md,
    },

    fullWidth: {
        width: "100%",
        paddingVertical: 14,
    },
});
