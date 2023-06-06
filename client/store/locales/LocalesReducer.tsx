import {
    I18nActionTypes,
    CHANGE_LOCALES
} from '@/store/locales/models/actions'
import {I18n} from "@/store/locales/models/I18n";

const defalutState = {
    locales: 'en-US'
}

export const localesReducer = (
    state = defalutState,
    action: I18nActionTypes
) => {
    switch (action.type){
        case "CHANGE_LOCALES":
            return {
                ...state,
                locales: action.I18n.locales
            }
        default:
            return state
    }
}


