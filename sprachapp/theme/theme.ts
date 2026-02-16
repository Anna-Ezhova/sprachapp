/* ---------- Theme-Konfiguration ---------- */
// Zentrale Design-Definition für Farben, Abstände, Radien und Typografie.

export const theme = {
    /* ---------- Farbpalette ---------- */
    colors: {
        bg: "#FAFAFA", // Seiten-Hintergrund
        card: "#FFFFFF", // Karten-Hintergrund
        text: "#111111", // Primärer Text
        muted: "#666666", // Sekundärer / dezenter Text
        border: "#E6E6E6", // Standard-Rahmen
        subtle: "#F3F3F3", // Dezenter Hintergrund (z.B. Prompt-Box)
        primary: "#111111", // Primärfarbe (Buttons)
        onPrimary: "#FFFFFF", // Text auf Primärfarbe
        success: "#1E7A3E", // Erfolg (richtig)
        danger: "#C62828", // Fehler (falsch)
        onStatus: "#FFFFFF", // Text auf Statusfarben
    },
    /* ---------- Spacing-System ---------- */
    space: {
        xs: 6,
        sm: 10,
        md: 12,
        lg: 16,
        xl: 24,
    },
    /* ---------- Border-Radien ---------- */
    radius: {
        md: 12,
        sm: 10,
        pill: 999, // Vollständig abgerundet (Badges)
    },
    /* ---------- Typografie-Styles ---------- */
    text: {
        title: { fontSize: 26, fontWeight: "800" as const }, // Screen-Titel
        section: { fontSize: 16, fontWeight: "800" as const }, // Abschnittsüberschrift
        body: { fontSize: 14, fontWeight: "700" as const }, // Standardtext
        small: { fontSize: 12, fontWeight: "700" as const }, // Kleiner Text
    },
};
