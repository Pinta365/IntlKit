//Import library functions
import { intlKit, setLocale, setTranslations, t } from "@intlkit/intlkit";

//Import translated texts.
import enTranslations from "./lang/en-US.json" with { type: "json" };
import svTranslations from "./lang/sv-SE.json" with { type: "json" };

//Initialize
intlKit({ defaultLocale: "sv-SE" });

//Set translations to locales.
setTranslations(enTranslations, "en-US");
setTranslations(svTranslations, "sv-SE");

//Helper function to print some translated texts based on current locale.
function print() {
    const userName = "Alice";
    const cartItemCount = 6; //See what happens with the cart text if you set this to 1 or 0

    const welcomeMessage = t("welcome", { variables: { name: userName } });
    console.log(welcomeMessage);

    const cartMessage = t("cart", { quantity: cartItemCount });
    console.log(cartMessage, "\n");
}

console.log("--= Print with default locale.");
print();

console.log("--= Change locale and print.");
setLocale("en-US");
print();

/*
Outputs:

    --= Print with default locale.
    Välkommen, Alice! Utforska vår noggrant utvalda kollektion.
    Du har 6 varor i din varukorg.

    --= Change locale and print.
    Welcome, Alice! Explore our curated collection.
    You have 6 items in your cart.


*/
