import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";

import { useUser } from "@/hooks/useUser";
import { loadProgress } from "@/services/progressService";
import { loadUseDemoData, saveUseDemoData } from "@/services/appConfigService";

import { exercises } from "@/data/exercises";

import { demoVocabAttempts } from "@/data/demoVocabAttempts";

import { buildLast7DaysDailyFromAttempts, computeStreak, computeTotalMinutes } from "@/utils/progress";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";
import { ProgressStatCard } from "@/components/ProgressStatCard";

import { theme } from "@/theme/theme";
import { Card } from "@/components/ui/Card";

export default function ProgressScreen() {

    /* ---------- User State ---------- */
    const { user, loading } = useUser();

    /* ---------- Demo Toggle State ---------- */
    const [useDemo, setUseDemo] = useState(false);
    const [store, setStore] = useState<{ attempts: any[] }>({ attempts: [] });

    /* ---------- Initial: Demo-Flag laden ---------- */
    useEffect(() => {
        loadUseDemoData().then(setUseDemo);
    }, []);

    /* ---------- Progress-Daten laden ---------- */
    // Reagiert auf User-Wechsel oder Demo-Toggle.
    useEffect(() => {
        if (!user) return;

        if (useDemo) {
            setStore({ attempts: demoVocabAttempts });
            return;
        }

        setStore({ attempts: [] }); // Reset vor Reload

        loadProgress(user.id)
            .then((s) => {
                setStore({
                    attempts: Array.isArray((s as any).attempts) ? (s as any).attempts : [],
                });
            })
            .catch((err) => {
                console.warn("loadProgress failed:", err);
                setStore({ attempts: [] });
            });
    }, [user, useDemo]);

    /* ---------- Abgeleitete Daten ---------- */
    const attempts = store.attempts ?? [];
    const limitedAttempts = attempts.slice(0, 5); // nur letzte 5 anzeigen

    const last7Days = useMemo(
        () => buildLast7DaysDailyFromAttempts(attempts),
        [attempts]
    );
    const totalMinutes = computeTotalMinutes(attempts);
    const streak = computeStreak(attempts);
    const completed = attempts.length;

    const correct = attempts.filter((a) => {
        const ex = exercises.find((e) => e.id === a.exerciseId);
        return ex ? a.chosenAnswerId === ex.correctAnswerId : false;
    }).length;

    /* ---------- Guard: Loading ---------- */
    if (loading || !user) return null;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Fortschritt</Text>

            {/* ---------- Demo-Switch ---------- */}
            <Card style={styles.topRow}>
                <Text style={styles.muted}>Demo-Daten</Text>
                <Switch
                    value={useDemo}
                    onValueChange={async (v) => {
                        setUseDemo(v);
                        await saveUseDemoData(v);
                    }}
                />
            </Card>

            {/* ---------- Statistik-Karten ---------- */}
            <View style={styles.grid}>
                <ProgressStatCard label="Streak" value={`${streak} Tage`} hint="in Folge gelernt" />
                <ProgressStatCard label="Lernzeit" value={`${Math.round(totalMinutes)} min`} hint="Gesamt" />
                <ProgressStatCard label="Fragen" value={completed} hint="Abgeschlossen" />
                <ProgressStatCard label="Richtig" value={correct} hint="Antworten" />
            </View>

            {/* ---------- Wochen-Chart ---------- */}
            <View style={styles.chartBlock}>
                <WeeklyBarChart data={last7Days} />
            </View>

            {/* ---------- Letzte Versuche ---------- */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zuletzt:</Text>

                <View style={{ gap: theme.space.sm }}>
                    {limitedAttempts.map((item) => {
                        const ex = exercises.find((e) => e.id === item.exerciseId);

                        const prompt = ex?.prompt ?? "Unbekannt";
                        const chosen =
                            ex?.answers.find((a) => a.id === item.chosenAnswerId)?.text ?? "—";
                        const correct =
                            ex?.answers.find((a) => a.id === ex?.correctAnswerId)?.text ?? "—";

                        const isCorrect = ex ? item.chosenAnswerId === ex.correctAnswerId : false;

                        return (
                            <Card key={item.id}>
                                <View style={styles.attemptRow}>
                                    <Text style={styles.attemptPrompt}>{prompt}</Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.badge, isCorrect ? styles.badgeOk : styles.badgeBad]}
                                    >
                                        {isCorrect ? "Richtig" : "Falsch"}
                                    </Text>
                                </View>

                                <Text style={styles.muted}>Deine Antwort: {chosen}</Text>
                                {!isCorrect && (
                                    <Text style={styles.muted}>Richtig wäre: {correct}</Text>
                                )}
                            </Card>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg,
    },
    content: {
        padding: theme.space.lg,
        paddingBottom: theme.space.xl,
    },
    title: {
        ...theme.text.title,
        color: theme.colors.text,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.space.md,
        marginTop: theme.space.md,
    },
    chartBlock: {
        marginTop: theme.space.md,
    },
    section: {
        marginTop: theme.space.md,
        gap: theme.space.sm,
    },
    sectionTitle: {
        ...theme.text.section,
        color: theme.colors.text,
    },
    attemptRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: theme.space.sm,
    },
    attemptPrompt: {
        ...theme.text.body,
        color: theme.colors.text,
        fontWeight: "900",
        flex: 1,
        flexShrink: 1,
    },
    badge: {
        fontSize: 12,
        fontWeight: "900",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: theme.radius.pill,
        overflow: "hidden",
        flexShrink: 0,
    },
    badgeText: {
        flexShrink: 0,
    },
    badgeOk: {
        backgroundColor: theme.colors.subtle,
        color: theme.colors.text,
    },
    badgeBad: {
        backgroundColor: theme.colors.subtle,
        color: theme.colors.text,
        opacity: 0.7,
    },
    muted: {
        color: theme.colors.muted,
        marginTop: 4,
    },
});
