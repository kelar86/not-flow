import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
      translation: {
        no_items: "You don't have any items yet",
        no_items_desc: "Start by adding your first item.",
        table: {
          id: "ID",
          title: "Title",
          description: "Description",
          actions: "Actions",
          empty_description: "N/A",
        },
        page_heading: "Items",
      },
    },
    ru: {
      translation: {
        no_items: "У вас пока нет ботов",
        no_items_desc: "Начните с добавления первого бота.",
        table: {
          id: "Идентификатор",
          title: "Название",
          description: "Описание",
          actions: "Действия",
          empty_description: "—",
        },
        page_heading: "Предметы",
      },
    },
  };

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
