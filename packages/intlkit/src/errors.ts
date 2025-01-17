//src/errors.ts

/**
 * Custom error class for IntlKit, extending the base Error class.
 */
export class IntlKitError extends Error {
    /**
     * Creates a new IntlKitError instance.
     *
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "IntlKitError";
    }
}

/**
 * Error thrown when a translation key is missing.
 */
export class MissingTranslationError extends IntlKitError {
    /**
     * Creates a new MissingTranslationError instance.
     *
     * @param key - The missing translation key.
     * @param locale - The locale where the key is missing.
     */
    constructor(key: string, locale: string) {
        super(`Missing translation key "${key}" for locale "${locale}"`);
        this.name = "MissingTranslationError";
    }
}

/**
 * Error thrown when an invalid translation data is provided.
 */
export class InvalidTranslationDataError extends IntlKitError {
    /**
     * Creates a new InvalidTranslationDataError instance.
     *
     * @param reason - The reason for error, short description.
     * @param locale - (Optional )The invalid locale.
     */
    constructor(reason: string, locale?: string) {
        super(locale ? `${reason}, Locale: "${locale}"` : `${reason}`);
        this.name = "InvalidTranslationDataError";
    }
}

/**
 * Error thrown when an invalid locale is provided.
 */
export class InvalidLocaleError extends IntlKitError {
    /**
     * Creates a new InvalidLocaleError instance.
     *
     * @param locale - The invalid locale.
     */
    constructor(locale: string) {
        super(`Invalid locale "${locale}"`);
        this.name = "InvalidLocaleError";
    }
}

/**
 * Error thrown when an invalid plural category is encountered.
 */
export class InvalidPluralCategoryError extends IntlKitError {
    /**
     * Creates a new InvalidPluralCategoryError instance.
     *
     * @param category - The invalid plural category.
     */
    constructor(category: string) {
        super(`Invalid plural category "${category}"`);
        this.name = "InvalidPluralCategoryError";
    }
}
