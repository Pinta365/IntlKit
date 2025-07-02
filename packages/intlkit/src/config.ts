import type { IntlKitConfig, Locale, PluralCategory, TranslationData, TranslationKey, TranslationValue } from "./types.ts";
import { InvalidTranslationDataError } from "./errors.ts";

export let translations: TranslationData = {};

let currentConfig: IntlKitConfig;

/**
 * The default configuration for IntlKit.
 */
currentConfig = {
    pluralizationRules: {},
    polyfillZeroCategory: true,
    throwOnError: false,
    onMissingTranslation: undefined,
    defaultLocale: "en-US",
    locale: "",
} as IntlKitConfig;

/**
 * Initializes or updates the IntlKit configuration and returns current config.
 *
 * This function serves two primary purposes:
 *
 * 1. **Initial Configuration:** When called without any arguments, it initializes IntlKit with the default configuration, ensuring the library is ready to use.
 *
 *    ```typescript
 *    import { intlKit } from "@intlkit/intlkit";
 *
 *    intlKit(); // Initialize with default settings
 *    ```
 *
 * 2. **Configuration Updates:**  When called with a `config` object, it updates the existing configuration with the provided values. This allows for flexible modification of settings at runtime.
 *
 *    ```typescript
 *    intlKit({ defaultLocale: "fr-FR" }); // Update the default locale
 *    ```
 *
 * @param config - Optional configuration object for IntlKit.
 * @returns The current IntlKit configuration.
 */
export function intlKit(config?: Partial<IntlKitConfig>): IntlKitConfig {
    if (config) {
        currentConfig = { ...currentConfig, ...config };
    }
    return currentConfig;
}

/**
 * Sets the current locale for IntlKit.
 *
 * @param locale - The locale to set.
 */
export function setLocale(locale: Locale) {
    intlKit({ locale: locale });
}

/**
 * Gets the current locale for IntlKit.
 */
export function getLocale(): Locale {
    return currentConfig.locale || currentConfig.defaultLocale;
}

/**
 * Gets the current translations for the specified locale.
 *
 * @param locale - The locale for which to retrieve translations.
 * @returns The translation data for the locale.
 */
export function getTranslations(locale: string): {
    [key: TranslationKey]: TranslationValue;
} {
    return translations[locale];
}

/**
 * Sets the translations for a specific locale.
 *
 * @param data - The translation data.
 * @param locale - The locale for which to set the translations.
 */
export function setTranslations(data: TranslationValue, locale: Locale) {
    if (typeof data === "object") {
        translations[locale] = data;
    } else {
        throw new InvalidTranslationDataError(
            "Invalid input for setTranslations",
            locale,
        );
    }
}

/**
 * Merges new translations into the existing translations for a specific locale.
 *
 * @param data - The translation data to add or update.
 * @param locale - The locale for which to add the translations.
 */
export function addTranslations(data: TranslationValue, locale: Locale) {
    if (typeof data === "object") {
        translations[locale] = { ...(translations[locale] || {}), ...data };
    } else {
        throw new InvalidTranslationDataError(
            "Invalid input for addTranslations",
            locale,
        );
    }
}

/**
 * Replaces the entire translation data for all locales.
 *
 * @param data - The new translation data for all locales.
 */
export function replaceAllTranslations(data: TranslationData) {
    if (typeof data === "object") {
        translations = data;
    } else {
        throw new InvalidTranslationDataError("Invalid input for replaceAllTranslations");
    }
}

/**
 * Removes the translations for a specific locale.
 *
 * @param locale - The locale for which to remove translations.
 */
export function wipeTranslation(locale: Locale) {
    delete translations[locale];
}

/**
 * Removes all translations.
 */
export function wipeTranslations() {
    for (const locale in translations) {
        delete translations[locale];
    }
}

/**
 * Sets a custom pluralization rule for a specific locale.
 *
 * @param locale - The locale for which to set the rule.
 * @param rule - The pluralization rule function.
 */
export function setPluralizationRule(
    locale: Locale,
    rule: (count: number) => PluralCategory,
) {
    const currentRules = intlKit().pluralizationRules;
    intlKit({
        pluralizationRules: {
            ...currentRules,
            [locale]: rule,
        },
    });
}
