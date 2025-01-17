/**
 * Represents a rule for modifying the speech representation of a number.
 */
export type SpeechRule =
    | { type: "replace"; pattern: string; replacement: string }
    | { type: "insert"; pattern: string; insertion: string; position?: "before" | "after" };

/**
 * Defines the structure for a speech mapping, which provides the words and rules for converting numbers to speech.
 */
export interface SpeechMapping {
    negative: string;
    zero: string;
    units: string[];
    teens: string[];
    tens: string[];
    hundred: string;
    million: string;
    thousand: string;
    rules?: SpeechRule[];
}

//Define Brittish and American speech mapping by default.
const defaultSpeechMappings: Record<string, SpeechMapping> = {
    "british": {
        negative: "minus",
        zero: "zero",
        units: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        tens: ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        hundred: "hundred",
        thousand: "thousand",
        million: "million",
        rules: [
            {
                type: "replace",
                pattern: "(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) (one|two|three|four|five|six|seven|eight|nine)",
                replacement: "$1-$2",
            },
            { type: "replace", pattern: "(hundred) ([a-zA-Z]+)", replacement: "$1 and $2" },
            { type: "replace", pattern: "(thousand|million) ([a-zA-Z]+) (?! (hundred|thousand|million))", replacement: "$1, $2 " },
            { type: "replace", pattern: "(thousand|million) ([a-zA-Z]+)", replacement: "$1 and $2" },
        ],
    },
    "american": {
        negative: "minus",
        zero: "zero",
        units: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        tens: ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        hundred: "hundred",
        thousand: "thousand",
        million: "million",
        rules: [
            {
                type: "replace",
                pattern: "(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) (one|two|three|four|five|six|seven|eight|nine)",
                replacement: "$1-$2",
            },
        ],
    },
};

/**
 * A global store for speech mappings, keyed by their identifier (e.g., "american", "british").
 * This allows for dynamic loading and access of different speech mappings.
 */
const speechMappings: Record<string, SpeechMapping> = { ...defaultSpeechMappings };

/**
 * Loads a custom speech mapping for number-to-speech conversion.
 * This allows extending IntlKit with support for additional languages or dialects.
 *
 * @param key - The key to identify the speech mapping.
 * @param mapping - The speech mapping object.
 *
 * @example
 * loadSpeechMapping("swedish", {
 *   zero: "noll",
 *   units: ...
 *   // ... other properties
 * });
 */
export function loadSpeechMapping(key: string, mapping: SpeechMapping) {
    speechMappings[key] = mapping;
}

/**
 * Converts a number to its cardinal speech representation.
 *
 * @param n - The number to convert.
 * @param key - The key of the speech mapping to use (e.g., "british"). Defaults to "american".
 * @returns The cardinal speech representation of the number.
 * @throws Error if the specified speech mapping is not found.
 *
 * @example
 * // Returns "one hundred twenty-three"
 * numberToSpeechCardinal(123);
 */
export function numberToSpeechCardinal(n: number, key: string = "american"): string {
    const mappings = speechMappings[key];
    if (!mappings) {
        throw new Error(`Speech mapping with key ${key} not found`);
    }

    const { negative, units, teens, tens, hundred, thousand, million, rules } = mappings;

    let isNegative = false;
    if (n < 0) {
        isNegative = true;
        n = Math.abs(n);
    }

    // Helper to convert a chunk of a number (up to 3 digits) to its speech representation
    function convertChunk(chunk: number): string {
        let result = "";
        if (chunk >= 100) {
            result += units[Math.floor(chunk / 100) - 1] + (hundred ? " " + hundred : "");
            chunk %= 100;
            if (chunk) {
                result += " ";
            }
        }
        if (chunk >= 20) {
            result += tens[Math.floor(chunk / 10) - 2];
            chunk %= 10;
            if (chunk) {
                result += " ";
            }
        }
        if (chunk >= 10 && chunk <= 19) {
            result += teens[chunk - 10];
        } else if (chunk > 0) {
            result += units[chunk - 1];
        }
        return result;
    }

    let result = "";

    if (n === 0) {
        return mappings.zero;
    }

    if (n >= 1000000) {
        result += convertChunk(Math.floor(n / 1000000)) + " " + million;
        n %= 1_000_000;

        if (n > 0) {
            result += " ";
        }
    }

    if (n >= 1000) {
        result += convertChunk(Math.floor(n / 1000)) + " " + thousand;
        n %= 1000;

        if (n > 0) {
            result += " ";
        }
    }

    if (n > 0) {
        result += convertChunk(n);
    }

    if (rules) {
        for (const rule of rules) {
            switch (rule.type) {
                case "replace":
                    result = result.replace(new RegExp(rule.pattern, "g"), rule.replacement);
                    break;
                case "insert": {
                    const position = rule.position || "after";
                    if (position === "after") {
                        result = result.replace(new RegExp(rule.pattern, "g"), `$&${rule.insertion}`);
                    } else if (position === "before") {
                        result = result.replace(new RegExp(rule.pattern, "g"), `${rule.insertion}$&`);
                    }
                    break;
                }
            }
        }
    }

    return (isNegative ? `${negative} ${result}` : result).trim();
}
