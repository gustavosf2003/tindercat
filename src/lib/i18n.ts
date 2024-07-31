import en from "@src/locales/en/index.json";
import sv from "@src/locales/sv/index.json";
import { STORAGE, getStorageData } from "@src/utils/storage";
import i18n, { changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";

export async function setDefaultLanguage() {
  const storageSavedLanguage = await getStorageData(STORAGE.LANGUAGE);

  if (storageSavedLanguage) {
    changeLanguage(storageSavedLanguage);
  } else {
    changeLanguage("en");
  }
}

i18n.use(initReactI18next).init({
  lng: "en",
  supportedLngs: ["en", "sv"],
  fallbackLng: "en",
  compatibilityJSON: "v3",
  ns: ["translation"],
  defaultNS: "translation",
  resources: {
    en: {
      translation: en,
    },
    sv: {
      translation: sv,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
