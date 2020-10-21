import Cookies from 'cookies-js'
import { menu } from './../constants'
import { setVisitedStatusVisited, getVisitedStatus } from './visitorReducer'
import { testGreenPathServiceConnection } from './pathsReducer'
import { Action } from 'redux'

export enum Lang {
  FI = 'fi',
  EN = 'en',
  SV = 'sv'
}

const initialMenuState: UiReducer = {
  lang: Lang.EN,
  info: false,
  pathPanel: false,
  pathPanelContent: null,
}

interface UiAction extends Action {
  lang: Lang
}

const uiReducer = (store: UiReducer = initialMenuState, action: UiAction): UiReducer => {

  switch (action.type) {

    case 'TOGGLE_LANG': return { ...store, lang: action.lang }

    case 'SHOW_INFO': return { ...store, info: true }

    case 'HIDE_INFO': return { ...store, info: false }

    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    case 'SHOW_PATH_LIST': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'SHOW_LENGTH_FILTER_SELECTOR': return { ...store, pathPanel: true, pathPanelContent: menu.lengthLimitSelector }

    default:
      return store
  }
}

export const toggleLanguage = (lang: Lang) => {
  return (dispatch: any) => {
    const toggleToLang = lang === Lang.EN ? Lang.FI : lang === Lang.FI ? Lang.SV : Lang.EN
    dispatch(setLanguage(toggleToLang))
  }
}

export const setLanguage = (lang: Lang) => {
  return (dispatch: any) => {
    Cookies.set('gp-lang', lang)
    localStorage.setItem('gp-lang', lang)
    dispatch({ type: 'TOGGLE_LANG', lang })
  }
}

export const loadSelectedLanguage = () => {
  return (dispatch: any) => {
    const langC = Cookies.get('gp-lang')
    const langLs = localStorage.getItem('gp-lang')
    const lang = langC ? langC as Lang : langLs as Lang
    if (lang && Object.values(Lang).includes(lang)) {
      dispatch({ type: 'TOGGLE_LANG', lang })
    }
  }
}

export const showInfo = () => ({ type: 'SHOW_INFO' })

export const hideInfo = () => {
  return (dispatch: any) => {
    const visited = getVisitedStatus()
    // if first visit, set visited cookie to yes and check connection to qp service
    if (!visited) {
      dispatch(setVisitedStatusVisited())
      dispatch(testGreenPathServiceConnection())
    }
    dispatch({ type: 'HIDE_INFO' })
  }
}

export const showMaxLengthFilterSelector = () => ({ type: 'SHOW_LENGTH_FILTER_SELECTOR' })

export const showPathList = () => ({ type: 'SHOW_PATH_LIST' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default uiReducer
