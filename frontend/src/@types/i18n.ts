import resources from "../locales/dictionary";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources['en'];
  }
}