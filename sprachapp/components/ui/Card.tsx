import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { theme } from "@/theme/theme";

/* ---------- UI-Komponente: Card ---------- */
/*
   Wiederverwendbarer Container mit einheitlichem Design.
   Dient als visuelle Gruppierung für Inhalte (z. B. StatCards, Attempts, Switch-Bereich).
*/
export function Card({ style, ...props }: ViewProps) {
    return <View style={[styles.card, style]} {...props} />;
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        padding: theme.space.md,
        backgroundColor: theme.colors.card,
    },
});
