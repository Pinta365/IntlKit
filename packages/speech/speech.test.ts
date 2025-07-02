import { assertEquals } from "@std/assert";
import { loadSpeechMapping, numberToSpeechCardinal, SpeechMapping } from "@intlkit/speech";
import svSpeech from "../../examples/lang/sv-speech.json" with { type: "json" };

const speechMapping = svSpeech as SpeechMapping;

loadSpeechMapping("swedish", speechMapping);

// Define the expected outputs for various numbers.
const expected = {
    enGB: { //British English
        "-2641": "minus two thousand, six hundred and forty-one",
        "-45": "minus forty-five",
        "-1": "minus one",
        0: "zero",
        1: "one",
        2: "two",
        10: "ten",
        11: "eleven",
        19: "nineteen",
        20: "twenty",
        21: "twenty-one",
        45: "forty-five",
        100: "one hundred",
        101: "one hundred and one",
        853: "eight hundred and fifty-three",
        1006: "one thousand and six",
        2356: "two thousand, three hundred and fifty-six",
        10000: "ten thousand",
        305234: "three hundred and five thousand, two hundred and thirty-four",
        987654: "nine hundred and eighty-seven thousand, six hundred and fifty-four",
        1000000: "one million",
        1000006: "one million and six",
        1000026: "one million and twenty-six",
        9876543: "nine million, eight hundred and seventy-six thousand, five hundred and forty-three",
        987654321: "nine hundred and eighty-seven million, six hundred and fifty-four thousand, three hundred and twenty-one",
    },
    enUS: { //American English
        0: "zero",
        1: "one",
        2: "two",
        10: "ten",
        11: "eleven",
        19: "nineteen",
        20: "twenty",
        21: "twenty-one",
        45: "forty-five",
        100: "one hundred",
        101: "one hundred one",
        853: "eight hundred fifty-three",
        2356: "two thousand three hundred fifty-six",
        10000: "ten thousand",
        305234: "three hundred five thousand two hundred thirty-four",
        987654: "nine hundred eighty-seven thousand six hundred fifty-four",
        1000000: "one million",
        1000001: "one million one",
        9876543: "nine million eight hundred seventy-six thousand five hundred forty-three",
        987654321: "nine hundred eighty-seven million six hundred fifty-four thousand three hundred twenty-one",
    },
    svSE: { //Swedish
        0: "noll",
        1: "ett",
        2: "två",
        10: "tio",
        11: "elva",
        19: "nitton",
        20: "tjugo",
        21: "tjugoett",
        45: "fyrtiofem",
        100: "ett hundra",
        101: "ett hundra ett",
        200: "två hundra",
        201: "två hundra ett",
        853: "åtta hundra femtiotre",
        1000: "ett tusen",
        2356: "två tusen tre hundra femtiosex",
        10000: "tio tusen",
        11100: "elva tusen ett hundra",
        305234: "tre hundra fem tusen två hundra trettiofyra",
        987654: "nio hundra åttiosju tusen sex hundra femtiofyra",
        1000000: "en miljon",
        1000001: "en miljon ett",
        9876543: "nio miljoner åtta hundra sjuttiosex tusen fem hundra fyrtiotre",
        987654321: "nio hundra åttiosju miljoner sex hundra femtiofyra tusen tre hundra tjugoett",
    },
};

for (const [number, expectedSpeech] of Object.entries(expected.enUS)) {
    Deno.test(`numberToSpeechCardinal() American English - ${number}`, () => {
        assertEquals(numberToSpeechCardinal(parseInt(number), "american"), expectedSpeech);
    });
}

for (const [number, expectedSpeech] of Object.entries(expected.enGB)) {
    Deno.test(`numberToSpeechCardinal() British English - ${number}`, () => {
        assertEquals(numberToSpeechCardinal(parseInt(number), "british"), expectedSpeech);
    });
}

for (const [number, expectedSpeech] of Object.entries(expected.svSE)) {
    Deno.test(`numberToSpeechCardinal() Swedish- ${number}`, () => {
        assertEquals(numberToSpeechCardinal(parseInt(number), "swedish"), expectedSpeech);
    });
}
