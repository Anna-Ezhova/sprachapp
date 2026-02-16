import React from "react";
import {
    Pressable,
    Text,
    StyleSheet,
    PressableProps,
    PressableStateCallbackType,
    StyleProp,
    ViewStyle,
} from "react-native";
import { theme } from "@/theme/theme";

type Props = Omit<PressableProps, "style"> & {
    title: string;
    variant?: "primary" | "secondary";
    style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

export function Button({
                           title,
                           variant = "primary",
                           style,
                           ...props
                       }: Props) {
    const isSecondary = variant === "secondary";

    return (
        <Pressable
            {...props}
            style={(state) => {
                const baseStyles: StyleProp<ViewStyle> = [
                    styles.base,
                    isSecondary ? styles.secondary : styles.primary,
                    state.pressed && styles.pressed,
                ];

                // ✅ User style kann StyleProp ODER callback sein
                const userStyles =
                    typeof style === "function" ? style(state) : style;

                return [baseStyles, userStyles];
            }}
        >
            <Text style={[styles.text, isSecondary && styles.textSecondary]}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: theme.radius.sm,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    text: {
        color: theme.colors.onPrimary,
        fontWeight: "800",
    },
    textSecondary: {
        color: theme.colors.text,
    },
    pressed: {
        opacity: 0.8,
    },
});
