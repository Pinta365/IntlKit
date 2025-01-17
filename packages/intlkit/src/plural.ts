//src/plural.ts
import { intlKit } from "./config.ts";
import type { PluralCategory } from "./types.ts";

/**
 * Gets the plural category for a given locale and quantity.
 *
 * @param locale - The locale to use.
 * @param quantity - The number to use for pluralization.
 * @param options - An optional object with options for Intl.PluralRules.
 * @returns The plural category.
 */
export function getPluralCategory(
    quantity: number,
    locale: string,
    options?: Intl.PluralRulesOptions,
): PluralCategory {
    const customRule = intlKit().pluralizationRules?.[locale];
    if (customRule) {
        return customRule(quantity);
    }

    try {
        const pluralRules = new Intl.PluralRules(locale, options);
        return pluralRules.select(quantity) as PluralCategory;
    } catch (_) {
        return "other";
    }
}
