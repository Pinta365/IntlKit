import type { Locale } from "../intlkit/src/types.ts";
import { intlKit } from "@intlkit/intlkit";
import { getPluralCategory } from "../intlkit/src/plural.ts";

/**
 * Formats a cardinal number based on pluralization rules.
 *
 * @param number - The number to format.
 * @param locale - The locale to use for pluralization rules.
 * @param format - An object with plural categories as keys and corresponding format strings as values.
 * @returns The formatted cardinal number string.
 *
 * @example
 * const format = {
 *   zero: "No items",
 *   one: "{{number}} item",
 *   other: "{{number}} items",
 * };
 * formatCardinal(0, "en-US", format); // Returns "No items"
 * formatCardinal(1, "en-US", format); // Returns "1 item"
 * formatCardinal(2, "en-US", format); // Returns "2 items"
 */
export function formatCardinal(
    number: number,
    locale: Locale,
    format: Record<string, string>,
): string {
    const pluralCategory = getPluralCategory(number, locale);

    const formatString = (number === 0 && format.zero) ||
        format[pluralCategory] || format.other;

    return formatString.replace("{{number}}", number.toString());
}

/**
 * Formats a number with an ordinal suffix (e.g., 1st, 2nd, 3rd).
 *
 * @param number - The number to format.
 * @param localeOrOptions - The locale to use or an options object for Intl.PluralRules.
 * @param suffixes - An optional object with suffixes for different plural categories. Defaults to English suffixes ("st", "nd", "rd", "th").
 * @returns The formatted ordinal number string.
 *
 * @example
 * formatOrdinal(1); // Returns "1st"
 * `You finished in ${formatOrdinal(2)} place!` // You finished in 2nd place!
 * formatOrdinal(9, "sv-SE", {
 *      one: ":a",
 *      other: ":e"}) // Returns "9:e" (using Swedish ordinal rules)
 */
export function formatOrdinal(
    number: number,
    localeOrOptions?: Locale | Intl.PluralRulesOptions,
    suffixes?: Record<string, string>,
): string {
    let locale: Locale = intlKit().locale || intlKit().defaultLocale;
    let options: Intl.PluralRulesOptions | undefined;

    if (typeof localeOrOptions === "string") {
        locale = localeOrOptions;
    } else if (typeof localeOrOptions === "object") {
        options = localeOrOptions;
    }

    const pluralCategory = getPluralCategory(number, locale, {
        type: "ordinal",
        ...options,
    });
    const localeSuffixes = suffixes || {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
    };
    const suffix = localeSuffixes[pluralCategory] || localeSuffixes.other;

    return `${number}${suffix}`;
}

/**
 * Formats a number using Intl.NumberFormat.
 *
 * @param number - The number to format.
 * @param localeOrOptions - The locale to use or an options object for Intl.NumberFormat.
 * @param options - An optional object with options for Intl.NumberFormat.
 * @returns The formatted number string.
 *
 * @example
 * formatNumber(12345.67); // Returns "12,345.67" (depending on locale)
 * formatNumber(12345.67, "de-DE"); // Returns "12.345,67"
 * formatNumber(12345.67, { style: "currency", currency: "USD" }); // Returns "$12,345.67"
 */
export function formatNumber(
    number: number,
    localeOrOptions?: Locale | Intl.NumberFormatOptions,
    options?: Intl.NumberFormatOptions,
): string {
    let locale: Locale = intlKit().locale || intlKit().defaultLocale;

    if (typeof localeOrOptions === "string") {
        locale = localeOrOptions;
    } else if (typeof localeOrOptions === "object") {
        options = localeOrOptions;
    }

    try {
        const formatter = new Intl.NumberFormat(locale, options);
        return formatter.format(number);
    } catch (error) {
        console.error(
            `Error formatting number ${number} for locale ${locale}:`,
            error,
        );
        return number.toString();
    }
}
