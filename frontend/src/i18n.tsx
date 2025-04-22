import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./locales/dictionary";



i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    supportedLngs: ["en", "ru"],
    // interpolation: { escapeValue: false },
    // react: { useSuspense: false },
  });

export default i18next;
