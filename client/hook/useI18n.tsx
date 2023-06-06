import React, {useState, useEffect} from "react";

interface Props {
    locales: string
}

interface i18nProps {
    t: (key: string)=> string
}
const useI18n = (props: Props): i18nProps=>{

    const [locale, setLocale] = useState<string>('zh-TW')

    useEffect(()=>{
        setLocale(props.locales)
    }, [props.locales])

    const translations:any = {
        'en-US': require('@/locales/en-US').default,
        'zh-TW': require('@/locales/zh-TW').default,
    };

    return {
        t: (key)=> translations[locale][key]
    };
}

export default useI18n;
