export type PluralCategory = "zero" | "one" | "two" | "few" | "many" | "other";

export type Locale = string;

export type TranslationKey = string;

export type TranslationValue =
    | string
    | { [key in PluralCategory]: string }
    | { [key: string]: TranslationValue };

export interface TranslationNamespace {
    [key: TranslationKey]: TranslationValue;
}

export interface TranslationData {
    [locale: Locale]: TranslationNamespace | {
        [namespace: string]: TranslationNamespace;
    };
}

export interface TranslateOptions {
    locale?: Locale;
    variables?: Record<string, string | number>;
    quantity?: number;
}

export interface IntlKitConfig {
    defaultLocale: Locale;
    locale?: Locale;

    polyfillZeroCategory?: boolean;

    pluralizationRules?: {
        [locale: string]: (quantity: number) => PluralCategory;
    };

    throwOnError?: boolean;

    onMissingTranslation?: (
        key: string,
        locale: string,
        options?: TranslateOptions,
    ) => string;
}
