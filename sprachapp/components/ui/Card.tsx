import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { theme } from "@/theme/theme";

export function Card({ style, ...props }: ViewProps) {
    return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        padding: theme.space.md,
        backgroundColor: theme.colors.card,
    },
});
