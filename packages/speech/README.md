# @intlkit/speech

Number-to-speech and speech mapping utilities for accessibility, voice features, and educational tools.

## Features

- Convert numbers to spoken text in multiple languages and dialects
- Built-in support for British and American English
- Easily add custom speech mappings (e.g., Swedish)

## Installation

This package is part of the IntlKit monorepo. Import it using the workspace import map:

```ts
import { loadSpeechMapping, numberToSpeechCardinal } from "@intlkit/speech";
```

## Usage

```ts
import { loadSpeechMapping, numberToSpeechCardinal } from "@intlkit/speech";
import svSpeech from "../../examples/lang/sv-speech.json" with { type: "json" };

// Add a custom mapping
loadSpeechMapping("swedish", svSpeech);

console.log(numberToSpeechCardinal(123, "swedish")); // "ett hundra tjugotre"
console.log(numberToSpeechCardinal(123, "british")); // "one hundred and twenty-three"
```

## Adding Custom Mappings

See `examples/lang/sv-speech.json` for the structure of a speech mapping. You can add any language or dialect by calling `loadSpeechMapping` with your
mapping object.

## API

- `loadSpeechMapping(key: string, mapping: SpeechMapping)`
- `numberToSpeechCardinal(n: number, key?: string): string`
- Types: `SpeechMapping`, `SpeechRule`

## License

MIT
