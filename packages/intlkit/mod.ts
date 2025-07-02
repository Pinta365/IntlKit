export {
    addTranslations,
    getLocale,
    getTranslations,
    intlKit,
    replaceAllTranslations,
    setLocale,
    setTranslations,
    wipeTranslation,
    wipeTranslations,
} from "./src/config.ts";

export { translate } from "./src/translate.ts";

export type {
    IntlKitConfig,
    Locale,
    PluralCategory,
    TranslateOptions,
    TranslationData,
    TranslationKey,
    TranslationNamespace,
    TranslationValue,
} from "./src/types.ts";
