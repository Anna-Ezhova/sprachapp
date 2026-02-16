import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DailyProgress } from "../types/progress";

type Props = {
    // Erwartet 7 Punkte: ältester links, heute rechts
    data: DailyProgress[];
    height?: number; // Höhe der PlotArea (nur Balkenfläche)
    stepMinutes?: number; // z.B. 10
    maxLines?: number; // z.B. 5
};

const GRID_COLOR = "#CFCFCF"; // Linien + Skalen-Text (sichtbar auf hellgrau)

function getScale(max: number, step: number, maxLines: number) {
    const roundedMax = Math.ceil(max / step) * step;
    const lines = Math.min(Math.max(roundedMax / step, 1), maxLines);
    const maxValue = lines * step;

    return {
        maxValue,
        steps: Array.from({ length: lines }, (_, i) => (i + 1) * step),
    };
}

function weekdayLabelFromISO(isoDate: string): string {
    // isoDate: "YYYY-MM-DD"
    // lokale Zeit, aber fix auf Mitternacht, damit der Wochentag stabil ist
    const d = new Date(`${isoDate}T00:00:00`);
    const labels = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return labels[d.getDay()];
}

export function WeeklyBarChart({
                                   data,
                                   height = 120,
                                   stepMinutes = 10,
                                   maxLines = 5,
                               }: Props) {
    // Paddings müssen zur Bar-Row passen, damit Grid & Balken exakt alignen.
    const PADDING_TOP = 6;
    const PADDING_BOTTOM = 0;
    const innerHeight = Math.max(height - PADDING_TOP - PADDING_BOTTOM, 1);

    const values = data.map((p) => p.minutes);
    const labels = data.map((p) => weekdayLabelFromISO(p.date));

    const rawMax = Math.max(...values, 1);
    const scale = getScale(rawMax, stepMinutes, maxLines);

    const sum = values.reduce((a, b) => a + b, 0);
    const roundedSum = Math.round(sum);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Letzte 7 Tage (Minuten)</Text>

            <View style={styles.plotRow}>
                {/* Y-Labels links */}
                <View style={[styles.yAxis, { height }]}>
                    {scale.steps.map((value) => {
                        const y = Math.round((value / scale.maxValue) * innerHeight);
                        return (
                            <Text
                                key={value}
                                style={[styles.yLabel, { bottom: PADDING_BOTTOM + y - 7 }]}
                            >
                                {value}
                            </Text>
                        );
                    })}
                </View>

                {/* PlotArea (ein gemeinsamer hellgrauer Hintergrund) */}
                <View style={[styles.plotArea, { height }]}>
                    {/* Bars */}
                    <View style={styles.barsRow}>
                        {labels.map((label, idx) => {
                            const value = values[idx];
                            const barHeight = Math.round(
                                (value / scale.maxValue) * innerHeight
                            );

                            return (
                                <View key={`${data[idx].date}-${label}`} style={styles.barItem}>
                                    <View style={[styles.bar, { height: barHeight }]} />
                                </View>
                            );
                        })}
                    </View>

                    {/* Grid-Layer über Balken */}
                    <View pointerEvents="none" style={[styles.gridLayer, { height }]}>
                        {scale.steps.map((value) => {
                            const y = Math.round((value / scale.maxValue) * innerHeight);
                            return (
                                <View
                                    key={value}
                                    style={[styles.gridLine, { bottom: PADDING_BOTTOM + y }]}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>

            {/* X-Achsen Labels */}
            <View style={styles.labelsRow}>
                <View style={styles.yAxisSpacer} />
                <View style={styles.xLabels}>
                    {labels.map((d, idx) => (
                        <Text key={`${data[idx].date}-${d}`} style={styles.barLabel}>
                            {d}
                        </Text>
                    ))}
                </View>
            </View>

            <Text style={styles.caption}>Summe: {roundedSum} min</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 12,
        color: "#111",
    },

    plotRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
    },

    yAxis: {
        width: 20,
        position: "relative",
    },
    yLabel: {
        position: "absolute",
        left: 0,
        right: 0,
        fontSize: 11,
        color: GRID_COLOR,
        textAlign: "left",
    },

    plotArea: {
        flex: 1,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
    },

    barsRow: {
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8,
        paddingTop: 6,
        paddingBottom: 0,
        paddingHorizontal: 6,
    },
    barItem: {
        flex: 1,
        justifyContent: "flex-end",
    },
    bar: {
        width: "100%",
        backgroundColor: "#111",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    gridLayer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        elevation: 10,
    },
    gridLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: GRID_COLOR,
    },

    labelsRow: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    yAxisSpacer: {
        width: 20,
        marginRight: 4,
    },
    xLabels: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 6,
    },
    barLabel: {
        flex: 1,
        textAlign: "center",
        fontSize: 12,
        color: "#666",
    },

    caption: {
        fontSize: 12,
        color: "#666",
        marginTop: 10,
    },
});
