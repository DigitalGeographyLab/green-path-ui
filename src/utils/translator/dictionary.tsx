import fi from './fi.json'
import sv from './sv.json'
import en from './en.json'
import { Lang } from '../../reducers/uiReducer'

const langs: Record<Lang, Record<string, string>> = {
  'fi': fi as Record<string, string>,
  'sv': sv as Record<string, string>,
  'en': en as Record<string, string>,
}

if (process.env.NODE_ENV !== 'production') {
  Object.keys(langs[Lang.EN]).forEach((key) => {
    if (!(key in langs[Lang.FI])) {
      console.error('missing key from FI dict:', key)
    }
    if (!(key in langs[Lang.SV])) {
      console.log(`missing key "${key}" from SV dict -> defaulting to EN`)
    }
  })
  Object.keys(langs[Lang.FI]).forEach((key) => {
    if (!(key in langs[Lang.EN])) {
      console.error('missing key from EN dict:', key)
    }
  })
  Object.keys(langs[Lang.SV]).forEach((key) => {
    if (!(key in langs[Lang.EN])) {
      console.error(`found invalid key "${key}" in SV dict`)
    }
  })
}

export const text = (lang: Lang, key: string): string => {
  if (key in langs[lang]) {
    return langs[lang][key]
  }
  // translate Swedish to English if translation is missing
  if (lang === Lang.SV && key in langs[Lang.EN]) {
    return langs[Lang.EN][key]
  }
  // return key if translation was not found
  return key
}

export const getErrorNotifKey = (errorKey: string): string => {
  const errorNotifKey = 'notif.error.routing.' + errorKey
  if (errorNotifKey in langs[Lang.EN]) {
    return errorNotifKey
  } else if (process.env.NODE_ENV !== 'production') {
    console.error('Received unknown error key:', errorNotifKey)
  }
  return 'notif.error.routing.general_routing_error'
}

export default (lang: Lang) => {
  return langs[lang]
}
