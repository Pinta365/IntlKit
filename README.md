# IntlKit (WIP)

IntlKit is an internationalization (i18n) library for TypeScript. Built with Deno, it's designed to be runtime-agnostic and seamlessly integrate with
various frameworks.

**Status: Work in Progress**

## Packages

- **@intlkit/intlkit**: Core translation, formatting, and locale management.
- **@intlkit/formatters**: Locale-aware number, date, and time formatting utilities.
- **@intlkit/speech**: Number-to-speech and speech mapping utilities for accessibility and voice features.

## Features

- **Translation Loading:** Load translations from JSON files or JavaScript modules.
- **Pluralization:** Comprehensive pluralization support using `Intl.PluralRules` and custom rules.
- **Number, Date, and Time Formatting:** Locale-aware formatting with sensible defaults.
- **Speech Mapping:** Convert numbers to spoken text in multiple languages and dialects.
- **Framework Integrations:** (Planned)

## Example Usage

Examples can be found in the [`examples/`](examples/) folder.

### Using the Core Package

```ts
import { createTranslator, loadTranslations } from "@intlkit/intlkit";

const translations = await loadTranslations("./examples/lang/en-US.json");
const t = createTranslator(translations);

console.log(t("greeting")); // "Hello"
```

### Using the Formatters Package

```ts
import { formatDateTime, formatNumber } from "@intlkit/formatters";

console.log(formatDateTime(new Date(), "en-US")); // "4/27/2024"
console.log(formatNumber(123456.789, "sv-SE")); // "123 456,789"
```

### Using the Speech Package

```ts
import { loadSpeechMapping, numberToSpeechCardinal } from "@intlkit/speech";

// Load a custom mapping (see examples/lang/sv-speech.json for structure)
loadSpeechMapping("swedish", {/* ... */});

console.log(numberToSpeechCardinal(123, "swedish")); // "ett hundra tjugotre"
```

## More Documentation

- [@intlkit/intlkit README](packages/intlkit/README.md)
- [@intlkit/formatters README](packages/formatters/README.md)
- [@intlkit/speech README](packages/speech/README.md)

## Contributing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
