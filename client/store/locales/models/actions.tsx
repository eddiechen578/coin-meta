import {I18n} from "@/store/locales/models/I18n";

export const CHANGE_LOCALES = 'CHANGE_LOCALES';


interface I18nAsync {
    I18n: I18n
}

interface ChangeI18nSuccess extends I18nAsync{
    type: typeof CHANGE_LOCALES
}

export type I18nActionTypes =
    | ChangeI18nSuccess