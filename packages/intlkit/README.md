# @intlkit/intlkit

Core translation, formatting, and locale management for the IntlKit monorepo.

## Features

- Add and manage translations for multiple locales
- Set and get the current locale
- Translate keys with options and namespaces
- Wipe or replace translations at runtime

## Installation

This package is part of the IntlKit monorepo. Import it using the workspace import map:

```ts
import { addTranslations, setLocale, translate } from "@intlkit/intlkit";
```

## Usage

```ts
import { addTranslations, setLocale, translate } from "@intlkit/intlkit";

addTranslations({ greeting: "Hello" }, "en");
setLocale("en");
console.log(translate("greeting")); // "Hello"
```

## API

### Functions

- `intlKit(config?: Partial<IntlKitConfig>): IntlKitConfig` – Initialize or update IntlKit configuration.
- `setLocale(locale: string)` – Set the current locale.
- `getLocale(): string` – Get the current locale.
- `getTranslations(locale: string): { [key: string]: TranslationValue }` – Get translations for a locale.
- `setTranslations(data: TranslationValue, locale: string)` – Set translations for a locale.
- `addTranslations(data: TranslationValue, locale: string)` – Merge new translations into a locale.
- `replaceAllTranslations(data: TranslationData)` – Replace all translations for all locales.
- `wipeTranslation(locale: string)` – Remove translations for a specific locale.
- `wipeTranslations()` – Remove all translations.
- `setPluralizationRule(locale: string, rule: (count: number) => PluralCategory)` – Set a custom pluralization rule for a locale.
- `translate(key: string, options?: TranslateOptions): string` – Translate a key with options.
- `getPluralCategory(quantity: number, locale: string, options?: Intl.PluralRulesOptions): PluralCategory` – Get the plural category for a number and
  locale.

## License

MIT
