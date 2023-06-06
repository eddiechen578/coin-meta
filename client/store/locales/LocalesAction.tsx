import {Dispatch} from 'redux';
import {AppActions} from '@/store/models/actions';
import {CHANGE_LOCALES} from "@/store/locales/models/actions";
import {I18n} from "@/store/locales/models/I18n";

const change_locales = (locale: I18n): AppActions=>(
   {
       type: CHANGE_LOCALES,
       I18n: locale
    }
)

export const request_change_locales = (lang: string)=>{
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(change_locales({
            locales: lang
        }))
    }
}
