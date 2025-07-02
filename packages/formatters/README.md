# @intlkit/formatters

Locale-aware number, date, time, and relative time formatting utilities for the IntlKit monorepo.

## Features

- Format numbers (cardinal, ordinal, general)
- Format dates and times
- Format relative time (e.g., "2 days ago")

## Usage

```ts
import { formatDate, formatNumber, formatOrdinal } from "@intlkit/formatters";

console.log(formatDate(new Date(), "en-US"));
//Outputs "5/26/2025"
console.log(formatNumber(12345.67, "en-US"));
//Outputs "12,345.67"
console.log(formatNumber(12345.67, "en-US", { style: "currency", currency: "USD" }));
//Outputs "$12,345.67"
console.log(formatOrdinal(1));
//Outputs "1st"
console.log(formatOrdinal(2));
//Outputs "2nd"
console.log(formatOrdinal(3));
//Outputs "3rd"
console.log(formatOrdinal(4));
//Outputs "4th"
console.log(formatOrdinal(9, "sv-SE", { one: ":a", other: ":e" }));
//Outputs "9:e" (using Swedish ordinal rules)
```

## API

- `formatDate(date: Date, locale: string): string`
- `formatTime(date: Date, locale: string): string`
- `formatNumber(value: number, locale: string): string`
- `formatCardinal(value: number, locale: string): string`
- `formatOrdinal(value: number, locale: string): string`
- `formatRelativeTimeSections(value: number, unit: string, locale: string): string`
- `relativeTimeFormat(value: number, unit: string, locale: string): string`

## License

MIT
