import { assertEquals } from "@std/assert";
import {
    formatCardinal,
    formatDate,
    formatNumber,
    formatOrdinal,
    formatRelativeTimeSections,
    formatTime,
    relativeTimeFormat,
} from "@intlkit/formatters";

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

Deno.test("formatCardinal() formats cardinal numbers correctly", () => {
    const format = {
        zero: "No items",
        one: "{{number}} item",
        other: "{{number}} items",
    };
    assertEquals(formatCardinal(0, "en-US", format), "No items");
    assertEquals(formatCardinal(1, "en-US", format), "1 item");
    assertEquals(formatCardinal(2, "en-US", format), "2 items");
});

Deno.test("formatOrdinal() formats ordinal numbers correctly", () => {
    assertEquals(formatOrdinal(1), "1st");
    assertEquals(formatOrdinal(2), "2nd");
    assertEquals(formatOrdinal(3), "3rd");
    assertEquals(formatOrdinal(4), "4th");
    assertEquals(formatOrdinal(9, "sv-SE", { one: ":a", other: ":e" }), "9:e");
});

Deno.test("relativeTimeFormat() formats relative time correctly", () => {
    assertEquals(
        typeof relativeTimeFormat("en", { numeric: "always", style: "long" }, 1, "hour"),
        "string",
    );
    assertEquals(
        typeof relativeTimeFormat("en", { numeric: "auto", style: "short" }, -2, "day"),
        "string",
    );
});

Deno.test("formatRelativeTimeSections() formats multi-unit relative time", () => {
    const result = formatRelativeTimeSections(
        "en",
        { numeric: "auto" },
        63072009, // 2 years, 9 seconds
    );
    assertEquals(typeof result, "string");
    // Should contain at least "year" and "second"
    const hasYear = /year|years/.test(result);
    const hasSecond = /second|seconds/.test(result);
    assertEquals(hasYear, true);
    assertEquals(hasSecond, true);
});
