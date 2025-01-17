export { getTranslations, intlKit, setLocale, setTranslations, wipeTranslation, wipeTranslations } from "./src/config.ts";

export { t } from "./src/translate.ts";

export { formatDate, formatTime } from "./src/formatters/datetime.ts";

export { formatCardinal, formatNumber, formatOrdinal } from "./src/formatters/number.ts";

export { loadSpeechMapping, numberToSpeechCardinal } from "./src/formatters/spoken.ts";
export type { SpeechMapping, SpeechRule } from "./src/formatters/spoken.ts";

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
