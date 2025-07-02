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

addTranslations("en", { greeting: "Hello" });
setLocale("en");
console.log(translate("greeting")); // "Hello"
```

## API

- `addTranslations(locale: string, data: TranslationData)`
- `setLocale(locale: string)`
- `getLocale(): string`
- `translate(key: string, options?: TranslateOptions): string`
- `wipeTranslations()`
- `replaceAllTranslations(locale: string, data: TranslationData)`
- Types: `IntlKitConfig`, `Locale`, `TranslateOptions`, `TranslationData`, etc.

## License

MIT
