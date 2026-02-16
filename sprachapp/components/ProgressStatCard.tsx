import React from "react";
import { View, Text, StyleSheet } from "react-native";

/* ---------- Typdefinition für Statistik-Karte ---------- */
/*
   Zeigt eine einzelne Kennzahl im Fortschrittsbereich an
   (z. B. Streak, Lernzeit, Anzahl Fragen, richtige Antworten).
*/
type Props = {
    label: string;
    value: string | number;
    hint?: string;
};

/* ---------- UI-Komponente: ProgressStatCard ---------- */
export function ProgressStatCard({ label, value, hint }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            {!!hint && <Text style={styles.hint}>{hint}</Text>}
        </View>
    );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#FFF",
        flexGrow: 1,
        flexBasis: "48%",
    },
    label: {
        fontSize: 12,
        color: "#666",
        marginBottom: 6,
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
    },
    hint: {
        fontSize: 12,
        color: "#666",
        marginTop: 6,
    },
});
