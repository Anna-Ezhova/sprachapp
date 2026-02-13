import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { demoProgress } from "@/data/demoProgress";
import { dailyProgressDemo } from "@/data/dailyProgressDemo";

import { buildLast7DaysSeries, computeStreak, sumMinutes } from "@/utils/progress";

import { ProgressStatCard } from "@/components/ProgressStatCard";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";

export default function ProgressScreen() {
    const p = demoProgress;

    const last7Days = buildLast7DaysSeries(dailyProgressDemo);
    const streak = computeStreak(dailyProgressDemo);
    const totalMinutes = sumMinutes(dailyProgressDemo);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dein Fortschritt</Text>
            <Text style={styles.subtitle}>
                Demo-Übersicht für {p.language} – basierend auf Beispiel-Daten.
            </Text>

            <View style={styles.grid}>
                <ProgressStatCard
                    label="Streak"
                    value={`${streak} Tage`}
                    hint="Tage in Folge gelernt"
                />
                <ProgressStatCard label="XP" value={p.xp} hint="Gesammelte Punkte" />
                <ProgressStatCard
                    label="Lernzeit"
                    value={`${totalMinutes} min`}
                    hint="Gesamt"
                />
                <ProgressStatCard
                    label="Übungen"
                    value={p.completedExercises}
                    hint="Abgeschlossen"
                />
            </View>

            <View style={styles.section}>
                <WeeklyBarChart data={last7Days} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zuletzt erledigt</Text>

                <FlatList
                    data={p.recent}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.sep} />}
                    renderItem={({ item }) => (
                        <View style={styles.activityRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activityTitle}>{item.title}</Text>
                                {!!item.subtitle && (
                                    <Text style={styles.activitySub}>{item.subtitle}</Text>
                                )}
                            </View>
                            <Text style={styles.activityDate}>
                                {formatDateShort(item.completedAt)}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

function formatDateShort(iso: string) {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}.`;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: "#FAFAFA",
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#111",
    },
    subtitle: {
        color: "#666",
        marginBottom: 4,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    section: {
        marginTop: 4,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111",
    },
    activityRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 12,
        backgroundColor: "#FFF",
        gap: 10,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111",
    },
    activitySub: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    activityDate: {
        fontSize: 12,
        color: "#666",
    },
    sep: {
        height: 10,
    },
});
