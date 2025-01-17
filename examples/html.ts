// examples/hono.ts example usage.
import { Hono } from "jsr:@hono/hono";
import {
    formatDate,
    formatNumber,
    formatTime,
    intlKit,
    loadSpeechMapping,
    numberToSpeechCardinal,
    setLocale,
    setTranslations,
    SpeechMapping,
    t,
} from "@intlkit/intlkit";

import enTranslations from "./lang/en-US.json" with { type: "json" };
import svTranslations from "./lang/sv-SE.json" with { type: "json" };
import svSpeech from "./lang/sv-speech.json" with { type: "json" };

intlKit({ defaultLocale: "en-US" });

//Add language files for translations.
setTranslations(enTranslations, "en-US");
setTranslations(svTranslations, "sv-SE");

//Add Swedish speech mapping for number to text conversion.
const speechMapping = svSpeech as SpeechMapping;
loadSpeechMapping("swedish", speechMapping);

const generatePage = (locale: string) => {
    const otherLocale = locale === "en-US" ? "sv-SE" : "en-US";
    const speechLang = locale === "en-US" ? "british" : "swedish"; //british format is nicer than american. :)
    const now = new Date();

    return `
  <!DOCTYPE html>
  <html lang="${locale.split("-")[0]}">
    <head>
      <title>IntlKit Demo</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    </head>
    <body style="scale: 0.8;">
      <main style="max-width: 850px;" class="container">
        <nav>
          <ul>
            <li><a href="#">${t("menu.home")}</a></li>
            <li><a href="#">${t("menu.products")}</a></li>
            <li><a href="#">${t("menu.about")}</a></li>
          </ul>
        </nav>

        
          <h2>IntlKit Demo</h2>
            <p>
              ${t("welcome", { variables: { name: "Pinta" } })}
            </p>
          <footer>
            <small>${t("slogan")}</small>
          </footer>

          <br><hr>
        <div class="grid">
          <div>
            <p>${t("apples", { quantity: 1 })}<br>
            ${t("apples", { quantity: 6 })}<br>
            ${t("apples", { quantity: 0 })}</p>

            <p>123<br>${numberToSpeechCardinal(123, speechLang)}</p>
            <p>-1234<br>${numberToSpeechCardinal(-1234, speechLang)}</p>
            <p>12345<br>${numberToSpeechCardinal(12345, speechLang)}</p>
          </div>
          <article>
            <header>
              <h3>${t("receipt.title")}</h3>
              <p>${t("receipt.text")}</p>
              <div>
                <p>${t("receipt.date")}: ${formatDate(now, { dateStyle: "long" })}</p>
                <p>${t("receipt.time")}: ${formatTime(now)}</p>
              </div>
            </header>
            <footer>
              <b>${t("receipt.total")}:
                ${formatNumber(12345.67, { style: "currency", currency: (locale === "en-US" ? "USD" : "SEK") })}
              </b>
            </footer>
          </article>
        </div>
        <br><hr>
        <a href="/?locale=${otherLocale}" role="button" class="secondary">
          ${t("switchLanguage", { variables: { language: t(`language.${otherLocale}`) as string } })}
        </a>
      </main>
      <footer style="max-width: 500px;" class="container">
        <a href="https://discord.gg/J7QtVxAt6F" target="_blank">${t("discordLink")}</a>
      </footer>
    </body>
  </html>
  `;
};

const app = new Hono();

app.get("/", (c) => {
    const locale = c.req.query("locale") || "en-US";
    setLocale(locale);
    const html = generatePage(locale);
    return c.html(html);
});

Deno.serve(app.fetch);
