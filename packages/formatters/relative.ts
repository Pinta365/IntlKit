// src/formatters/relative.ts

export function relativeTimeFormat(
    locale: string | string[] | undefined,
    options: Intl.RelativeTimeFormatOptions,
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
): string {
    try {
        const relativeTimeFormatter = new Intl.RelativeTimeFormat(locale, options);
        return relativeTimeFormatter.format(value, unit);
    } catch (error) {
        // Handle errors gracefully, e.g., by returning a default value
        console.error("Error formatting relative time:", error);
        return "---";
    }
}

export function resolvedRelativeTimeFormatOptions(
    locale: string | string[] | undefined,
    options: Intl.RelativeTimeFormatOptions,
): Intl.ResolvedRelativeTimeFormatOptions {
    const relativeTimeFormatter = new Intl.RelativeTimeFormat(locale, options);
    return relativeTimeFormatter.resolvedOptions();
}

export function supportedLocalesOf(
    locales: string | string[],
    options?: any,
): string[] {
    return Intl.RelativeTimeFormat.supportedLocalesOf(locales, options);
}

export function formatRelativeTimeSections(
    locale: string | string[] | undefined,
    options: Intl.RelativeTimeFormatOptions,
    value: number, // Value in seconds
    units: Intl.RelativeTimeFormatUnit[] = [
        "year",
        "month",
        "week",
        "day",
        "hour",
        "second",
    ], // Default units
): string {
    const parts: string[] = [];
    let remainingValue = Math.abs(value);

    const unitValues = {
        year: 31536000, // Seconds in a year
        month: 2592000, // Seconds in a month
        week: 604800, // Seconds in a week
        day: 86400, // Seconds in a day
        hour: 3600, // Seconds in an hour
        minute: 60, // Seconds in a minute
        second: 1, // Seconds in a second
    };

    for (const unit of units) {
        const unitValueInSeconds = unitValues[unit as keyof typeof unitValues];
        const unitCount = Math.floor(remainingValue / unitValueInSeconds);
        if (unitCount !== 0) {
            parts.push(
                relativeTimeFormat(locale, options, unitCount * Math.sign(value), unit),
            ); // Pass the original sign
            remainingValue -= unitCount * unitValueInSeconds;
        }
    }

    return parts.join(", "); // No need to add "ago" or "in"
}

// Implementera stöd för Intl.RelativeTimeFormat.supportedLocalesOf
