import type { TranslateOptions, TranslationData, TranslationKey, TranslationValue } from "./types.ts";
import { intlKit, translations } from "./config.ts";
import { getPluralCategory } from "./plural.ts";
import { InvalidLocaleError, MissingTranslationError } from "./errors.ts";

/**
 * Interpolates variables into a translation string.
 *
 * @param translation - The translation string or object.
 * @param options - Optional translation options including variables and quantity.
 * @returns The interpolated translation.
 */
function interpolateVariables(
    translation: TranslationValue,
    options?: TranslateOptions,
): TranslationValue {
    if (!options) {
        return translation;
    }

    let result = translation;
    if (options.variables) {
        for (const [key, value] of Object.entries(options.variables)) {
            const placeholder = `{{${key}}}`;
            result = (result as string).replace(
                new RegExp(placeholder, "g"),
                String(value),
            );
        }
    }

    if (options.quantity !== undefined) {
        result = (result as string).replace(/{{quantity}}/g, String(options.quantity));
    }
    return result;
}

/**
 * Translates a key into a localized string.
 *
 * **Locale Resolution Order:**
 * 1. If a `locale` is explicitly provided in the `options` object, it is used.
 * 2. Otherwise, the current locale set using `setLocale` is used.
 * 3. If no current locale is set, the default locale (configured via `setDefaultLocale` or the default "en-US") is used.
 *
 * @param key - The translation key.
 * @param options - Optional translation options.
 * @returns The translated string or object.
 * @throws {MissingTranslationError} If the translation key is missing and throwOnError is true.
 * @throws {InvalidLocaleError} If the locale is invalid and throwOnError is true.
 */
export function t(
    key: TranslationKey,
    options?: TranslateOptions,
): TranslationValue {
    const intlKitConfig = intlKit();
    const requestedLocale = options?.locale || intlKitConfig.locale || intlKitConfig.defaultLocale;
    let locale = requestedLocale;
    if (!translations[locale]) {
        const languageCode = locale.split("-")[0];
        if (translations[languageCode]) {
            locale = languageCode;
        } else {
            if (intlKitConfig.throwOnError) {
                throw new InvalidLocaleError(requestedLocale);
            } else if (intlKitConfig.onMissingTranslation) {
                return intlKitConfig.onMissingTranslation(
                    key,
                    requestedLocale,
                    options,
                );
            } else {
                console.warn(
                    `Missing translation for key "${key}" in locale "${requestedLocale}"`,
                );
                return key;
            }
        }
    }

    let translation: TranslationValue | undefined;

    const keys = key.split(".");

    if (key === "" || !translations[locale][keys[0]]) {
        if (intlKitConfig.throwOnError) {
            throw new MissingTranslationError(key, locale);
        } else if (intlKitConfig.onMissingTranslation) {
            return intlKitConfig.onMissingTranslation(
                key,
                locale,
                options,
            );
        } else {
            console.warn(
                `Missing translation for key "${key}" in locale "${locale}"`,
            );
            return key;
        }
    }

    if (keys.length === 1) {
        translation = translations[locale][key];
    } else {
        let tempTranslation = translations[locale];
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (typeof tempTranslation === "object" && tempTranslation) {
                if (i === keys.length - 1) {
                    translation = tempTranslation[k];
                } else {
                    tempTranslation = tempTranslation[k] as TranslationData;
                }
            } else {
                translation = undefined;
                break;
            }
        }
    }

    // Check if the translation is found
    if (!translation) {
        if (intlKitConfig.throwOnError) {
            throw new MissingTranslationError(key, locale);
        } else if (intlKitConfig.onMissingTranslation) {
            return intlKitConfig.onMissingTranslation(
                key,
                locale,
                options,
            );
        } else {
            console.warn(
                `Missing translation for key "${key}" in locale "${locale}"`,
            );
            return key;
        }
    }

    let result: TranslationValue;

    if (options?.quantity !== undefined && translation) {
        const customRule = intlKitConfig.pluralizationRules?.[locale];
        if (customRule) {
            const pluralCategory = customRule(options.quantity);
            result = typeof translation === "object" &&
                    translation[pluralCategory]
                ? translation[pluralCategory]
                : translation as string;
        } else if (intlKitConfig.polyfillZeroCategory) {
            if (typeof translation === "object" && translation["zero"] && options.quantity === 0) {
                result = translation["zero"];
            } else {
                const pluralCategory = getPluralCategory(
                    options.quantity,
                    locale,
                );
                if (
                    typeof translation === "object" &&
                    translation[pluralCategory]
                ) {
                    result = translation[pluralCategory];
                } else {
                    result = typeof translation === "object" &&
                            translation["other"]
                        ? translation["other"]
                        : translation as string;
                }
            }
        } else {
            const pluralCategory = getPluralCategory(options.quantity, locale);
            result = typeof translation === "object" &&
                    translation[pluralCategory]
                ? translation[pluralCategory]
                : translation as string;
        }
    } else {
        result = translation as string;
    }

    result = interpolateVariables(result, options);

    const placeholders = (result as string).match(/{{[^}]+}}/g);
    if (placeholders) {
        const missingVariables = placeholders.join(", ");
        throw new Error(`Missing variable "${missingVariables}" for translation key "${key}"`);
    }

    return result;
}
