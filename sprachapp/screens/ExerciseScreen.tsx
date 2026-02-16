import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import { Link } from "expo-router";

import { useUser } from "@/hooks/useUser";
import { useExercise } from "@/hooks/useExercise";
import { User } from "@/data/user";

import { theme } from "@/theme/theme";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ExerciseScreen() {

    const { user, loading } = useUser();

    /* ---------- Ladezustand ---------- */
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Training</Text>
                <Text style={styles.subtitle}>Lade Benutzer…</Text>
            </View>
        );
    }

    /* ---------- Kein Nutzer vorhanden ---------- */
    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Training</Text>
                <Text style={styles.subtitle}>Kein Benutzer gefunden.</Text>
                <Link href="/" asChild>
                    <Button title="Zurück zur Startseite" variant="secondary" />
                </Link>
            </View>
        );
    }

    return <ExerciseContent user={user} />;
}

/* ---------- Trainings-Inhalt ---------- */
function ExerciseContent({ user }: { user: User }) {
    const {
        exercise,
        selectedAnswer,
        showFeedback,
        finished,
        selectAnswer,
        checkAnswer,
        next,
        result,
    } = useExercise(user);

    /* ---------- Ergebnisansicht ---------- */
    if (finished && result) {
        const percent = Math.round((result.correct / result.total) * 100);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Ergebnis</Text>
                <Text style={styles.subtitle}>
                    {user.name}, hier ist dein Ergebnis.
                </Text>

                <Card>
                    <Text style={styles.sectionTitle}>Zusammenfassung</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Korrekte Antworten:</Text>
                        <Text style={styles.value}>
                            {result.correct} / {result.total}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Erfolgsquote</Text>
                        <Text style={styles.value}>{percent}%</Text>
                    </View>
                </Card>

                <View style={styles.resultActions}>
                    <Link href="/progress" replace asChild>
                        <Button title="Fortschritt anzeigen" />
                    </Link>

                    <Link href="/" asChild>
                        <Button title="Zurück zur Startseite" variant="secondary" />
                    </Link>
                </View>
            </View>
        );
    }

    /* ---------- Übungsansicht ---------- */
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Training</Text>

            <Card style={styles.cardGap}>
                <Text style={styles.question}>{exercise.question}</Text>

                <View style={styles.promptBox}>
                    <Text style={styles.prompt}>{exercise.prompt}</Text>
                </View>

                <View style={styles.answers}>
                    {exercise.answers.map((a) => {
                        const isSelected = selectedAnswer === a.id;
                        const isCorrectAnswer = a.id === exercise.correctAnswerId;

                        const showAsCorrect = showFeedback && isCorrectAnswer;
                        const showAsWrong = showFeedback && isSelected && !isCorrectAnswer;

                        return (
                            <Pressable
                                key={a.id}
                                onPress={() => selectAnswer(a.id)}
                                disabled={showFeedback}
                                style={({ pressed }) => [
                                    styles.answerButton,
                                    !showFeedback && isSelected && styles.answerSelectedBorder,
                                    showAsCorrect && styles.answerCorrect,
                                    showAsWrong && styles.answerWrong,
                                    pressed && !showFeedback && styles.answerPressed,
                                ]}
                            >
                                <Text style={[
                                    styles.answerText,
                                    (showAsCorrect || showAsWrong) && styles.answerTextOnStatus,
                                ]}>
                                    {a.text}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <Button
                    title={showFeedback ? "Weiter" : "Antwort prüfen"}
                    onPress={showFeedback ? next : checkAnswer}
                    style={!selectedAnswer ? styles.disabled : undefined}
                />
            </Card>

            <Link href={"/"} asChild>
                <Button title="Abbrechen" variant="secondary" />
            </Link>
        </View>
    );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.space.lg,
        gap: theme.space.md,
        backgroundColor: theme.colors.bg,
    },

    title: {
        ...theme.text.title,
        color: theme.colors.text,
    },

    subtitle: {
        color: theme.colors.muted,
    },

    cardGap: {
        gap: theme.space.md,
    },

    sectionTitle: {
        ...theme.text.section,
        color: theme.colors.text,
    },

    question: {
        ...theme.text.body,
        color: theme.colors.text,
    },

    promptBox: {
        backgroundColor: theme.colors.subtle,
        padding: theme.space.lg,
        borderRadius: theme.radius.md,
        marginTop: theme.space.sm,
    },

    prompt: {
        fontSize: 22,
        fontWeight: "900",
        color: theme.colors.text,
        textAlign: "center",
    },

    answers: {
        gap: theme.space.sm,
        marginTop: theme.space.md,
    },
    answerButton: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        paddingVertical: theme.space.sm,
        paddingHorizontal: theme.space.md,
        backgroundColor: theme.colors.card,
    },

    answerSelectedBorder: {
        borderColor: theme.colors.primary,
    },

    answerDark: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },

    answerPressed: {
        opacity: 0.85,
    },

    answerCorrect: {
        backgroundColor: theme.colors.success,
        borderColor: theme.colors.success,
    },

    answerWrong: {
        backgroundColor: theme.colors.danger,
        borderColor: theme.colors.danger,
    },

    answerText: {
        ...theme.text.body,
        color: theme.colors.text,
    },

    answerTextOnStatus: {
        color: theme.colors.onStatus,
    },

    answerSelected: {
        borderColor: theme.colors.primary,
    },

    answerTextSelected: {
        color: theme.colors.onPrimary,
    },

    feedbackBox: {
        marginTop: theme.space.sm,
        padding: theme.space.sm,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },

    feedbackText: {
        fontWeight: "800",
        color: theme.colors.text,
    },

    resultActions: {
        marginTop: theme.space.md,
        gap: theme.space.sm,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: theme.space.sm,
    },

    label: {
        color: theme.colors.muted,
    },

    value: {
        fontWeight: "900",
        color: theme.colors.text,
    },

    disabled: {
        opacity: 0.4,
    },
});