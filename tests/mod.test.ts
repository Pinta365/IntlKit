// mod.test.ts
import { assertEquals } from "@std/assert";
import { formatDate, formatNumber, formatTime, intlKit, setLocale, setTranslations, t } from "@intlkit/intlkit";

Deno.test("t() handles missing keys correctly", () => {
    intlKit({ throwOnError: true });

    try {
        t("missingKey");
        assertEquals(true, false);
    } catch (error) {
        assertEquals(error instanceof Error, true);
    }
});

Deno.test("t() uses onMissingTranslation config", () => {
    intlKit({
        throwOnError: false,
        onMissingTranslation: (key, locale) => {
            return `Missing: ${key} (${locale})`;
        },
    });

    const result = t("missingKey", { locale: "fr-FR" });
    assertEquals(result, "Missing: missingKey (fr-FR)");
});

Deno.test("t() handles variable interpolation", () => {
    setTranslations({
        message: "Hello, {{name}}! You have {{quantity}} messages.",
    }, "en");

    const result = t("message", {
        variables: { name: "Alice", quantity: 5 },
    });
    assertEquals(result, "Hello, Alice! You have 5 messages.");
});

Deno.test("t() handles pluralization", () => {
    setTranslations({
        apple: {
            one: "une pomme",
            other: "plusieurs pommes",
        },
    }, "fr");
    intlKit();
    setLocale("fr-FR");

    assertEquals(t("apple", { quantity: 1 }), "une pomme");
    assertEquals(t("apple", { quantity: 5 }), "plusieurs pommes");
});

Deno.test("t() handles nested keys", () => {
    setTranslations({
        greetings: {
            hello: "Hello",
            goodbye: "Goodbye",
        },
    }, "en");
    intlKit();
    setLocale("en");
    assertEquals(t("greetings.hello"), "Hello");
});

Deno.test("formatNumber() formats numbers correctly", () => {
    assertEquals(formatNumber(12345.67, "sv-SE"), "12\u00A0345,67");
    assertEquals(formatNumber(12345.67, "en-US"), "12,345.67");
    assertEquals(formatNumber(12345.67, "de-DE"), "12.345,67");
    assertEquals(
        formatNumber(12345.67, "en-US", {
            style: "currency",
            currency: "USD",
        }),
        "$12,345.67",
    );
});

Deno.test("formatDate() formats dates correctly", () => {
    const date = new Date(2025, 0, 10);
    assertEquals(formatDate(date, "en-US"), "1/10/2025");
    assertEquals(formatDate(date, "de-DE"), "10.1.2025");
    assertEquals(
        formatDate(date, "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        "Friday, January 10, 2025",
    );
});

Deno.test("formatTime() formats time correctly", () => {
    const date = new Date(2025, 0, 10, 14, 26, 35);

    assertEquals(formatTime(date, "en-US"), "2:26\u202FPM");
    assertEquals(formatTime(date, "de-DE"), "14:26");
});
