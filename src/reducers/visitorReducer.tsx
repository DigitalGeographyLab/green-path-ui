import Cookies from 'cookies-js'
import { setOdPanelHidden, showInfo } from './uiReducer'
import { Action } from 'redux'
import { setBaseMap } from './mapReducer'
import { defaultBasemap } from '../constants'
import { OdPlace, UrlState, VisitorReducer } from '../types'

const initialVisitorState: VisitorReducer = {
  visitedBefore: false,
  usedOds: [],
  gaDisabled: false,
}

interface VisitorAction extends Action {
  odObject: OdPlace
}

const visitorReducer = (
  store: VisitorReducer = initialVisitorState,
  action: VisitorAction,
): VisitorReducer => {
  switch (action.type) {
    case 'VISITED_BEFORE':
      return { ...store, visitedBefore: true }

    case 'GA-DISABLED':
      return { ...store, gaDisabled: true }

    case 'SET_USED_OD': {
      const filteredOds = store.usedOds.filter(
        od => od.properties.label !== action.odObject.properties.label,
      )
      filteredOds.unshift(action.odObject)
      return { ...store, usedOds: filteredOds.slice(0, 10) }
    }

    default:
      return store
  }
}

export const setStateFromUrl = (urlState: UrlState, location: any, history: any) => {
  return async (dispatch: any) => {
    if (urlState.basemap) {
      dispatch(setBaseMap(urlState.basemap, location, history))
    } else {
      dispatch(setBaseMap(defaultBasemap, location, history))
    }
    if (!urlState.odPanelVisible) {
      dispatch(setOdPanelHidden(!urlState.odPanelVisible, location, history))
    }
  }
}

const visitedKeyName = 'visited_22_03_17'

export const setVisitedStatusVisited = () => {
  return async (dispatch: any) => {
    Cookies.set(visitedKeyName, 'yes', { expires: 5184000 })
    localStorage.setItem(visitedKeyName, 'yes')
    dispatch({ type: 'VISITED_BEFORE' })
  }
}

export const getVisitedStatus = () => {
  const visitedC = Cookies.get(visitedKeyName)
  const visitedLs = localStorage.getItem(visitedKeyName)
  if (visitedC === 'yes' || visitedLs === 'yes') return true
  return false
}

export const showWelcomeIfFirstVisit = () => {
  return async (dispatch: any) => {
    const visited = getVisitedStatus()
    if (visited) {
      dispatch({ type: 'VISITED_BEFORE' })
    } else {
      dispatch(showInfo())
    }
  }
}

export const disableAnalyticsCookies = () => {
  //@ts-ignore
  window['ga-disable-G-JJJM7NNCXK'] = true
  Cookies.set('gp-ga-disabled', 'yes')
  localStorage.setItem('gp-ga-disabled', 'yes')
  return async (dispatch: any) => {
    dispatch({ type: 'GA-DISABLED' })
  }
}

export const maybeDisableAnalyticsCookies = () => {
  return async (dispatch: any) => {
    const gaDisabledCookie = Cookies.get('gp-ga-disabled')
    const gaDisabledLs = localStorage.getItem('gp-ga-disabled')
    if (gaDisabledCookie === 'yes' || gaDisabledLs === 'yes') {
      //@ts-ignore
      window['ga-disable-G-JJJM7NNCXK'] = true
      dispatch({ type: 'GA-DISABLED' })
    }
  }
}

export default visitorReducer
