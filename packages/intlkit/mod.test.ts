import { assertEquals } from "@std/assert";
import { addTranslations, getTranslations, intlKit, replaceAllTranslations, setLocale, setTranslations, translate as t } from "@intlkit/intlkit";

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

Deno.test("addTranslations merges new keys", () => {
    setTranslations({ greeting: "Hello" }, "en-US");
    addTranslations({ farewell: "Goodbye" }, "en-US");
    const result = getTranslations("en-US");
    if (result.greeting !== "Hello" || result.farewell !== "Goodbye") {
        throw new Error("addTranslations did not merge correctly");
    }
});

Deno.test("replaceAllTranslations replaces all locales", () => {
    setTranslations({ greeting: "Hello" }, "en-US");
    setTranslations({ greeting: "Hej" }, "sv-SE");
    replaceAllTranslations({ "fr-FR": { greeting: "Bonjour" } });
    const result = getTranslations("fr-FR");
    if (result.greeting !== "Bonjour") {
        throw new Error("replaceAllTranslations did not replace correctly");
    }
    if (getTranslations("en-US")) {
        throw new Error("Old translations were not removed");
    }
});
