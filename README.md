# IntlKit (WIP)

IntlKit is an internationalization (i18n) library for TypeScript. Built with Deno, it's designed to be runtime-agnostic and seamlessly integrate with
various frameworks.

**Status: Work in Progress**

## Packages

- **@intlkit/intlkit**: Core translation, formatting, and locale management.
- **@intlkit/speech**: Number-to-speech and speech mapping utilities for accessibility and voice features.

## Planned Features

- **Translation Loading:** Load translations from JSON files or JavaScript modules.
- **Pluralization:** Comprehensive pluralization support using `Intl.PluralRules` and custom rules.
- **Number, Date, and Time Formatting:** Locale-aware formatting with sensible defaults.
- **Speech Mapping:** Convert numbers to spoken text in multiple languages and dialects.
- **Framework Integrations:**

## Example Usage

** Examples can be found in the `examples/` folder.**

### Using the Speech Package

```ts
import { loadSpeechMapping, numberToSpeechCardinal } from "@intlkit/speech";

// Load a custom mapping (see examples/lang/sv-speech.json for structure)
loadSpeechMapping("swedish", {/* ... */});

console.log(numberToSpeechCardinal(123, "swedish")); // "ett hundra tjugotre"
```

## Contributing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
