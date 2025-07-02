import type { Locale } from "../intlkit/src/types.ts";
import { intlKit } from "../intlkit/src/config.ts";

/**
 * Formats a date using Intl.DateTimeFormat.
 *
 * @param date - The date to format.
 * @param localeOrOptions - The locale to use or an options object for Intl.DateTimeFormat.
 * @param options - An optional object with options for Intl.DateTimeFormat.
 * @returns The formatted date string.
 *
 * @example
 * formatDate(new Date()); // Returns "1/14/2025" (depending on locale)
 * formatDate(new Date(), "fr-FR"); // Returns "14/01/2025"
 * formatDate(new Date(), { dateStyle: "full" }); // Returns "Tuesday, January 14, 2025"
 */
export function formatDate(
    date: Date,
    localeOrOptions?: Locale | Intl.DateTimeFormatOptions,
    options?: Intl.DateTimeFormatOptions,
): string {
    let locale: Locale = intlKit().locale || intlKit().defaultLocale;

    if (typeof localeOrOptions === "string") {
        locale = localeOrOptions;
    } else if (typeof localeOrOptions === "object") {
        options = localeOrOptions;
    }

    try {
        const formatter = new Intl.DateTimeFormat(locale, options);
        return formatter.format(date);
    } catch (error) {
        console.error(`Error formatting date ${date} for locale ${locale}:`, error);
        return date.toDateString();
    }
}

/**
 * Formats a time using Intl.DateTimeFormat.
 *
 * @param date - The date to format (used for extracting the time).
 * @param localeOrOptions - The locale to use or an options object for Intl.DateTimeFormat.
 * @param options - An optional object with options for Intl.DateTimeFormat.
 * @returns The formatted time string.
 *
 * @example
 * formatTime(new Date()); // Returns "8:29 PM" (depending on locale)
 * formatTime(new Date(), "ja-JP"); // Returns "20:29"
 * formatTime(new Date(), { timeStyle: "medium" }); // Returns "8:29:45 PM"
 */
export function formatTime(
    date: Date,
    localeOrOptions?: Locale | Intl.DateTimeFormatOptions,
    options?: Intl.DateTimeFormatOptions,
): string {
    let locale: Locale = intlKit().locale || intlKit().defaultLocale;

    if (typeof localeOrOptions === "string") {
        locale = localeOrOptions;
    } else if (typeof localeOrOptions === "object") {
        options = localeOrOptions;
    }

    options = options || {};
    if (!options.timeStyle) {
        options.timeStyle = "short";
    }

    try {
        const formatter = new Intl.DateTimeFormat(locale, options);
        return formatter.format(date);
    } catch (error) {
        console.error(`Error formatting time ${date} for locale ${locale}:`, error);
        return date.toTimeString();
    }
}
