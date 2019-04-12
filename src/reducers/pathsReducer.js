import { turf } from '../utils/index'
import * as paths from './../services/paths'

const initialPaths = {
  pathFC: turf.asFeatureCollection([]),
}

const pathsReducer = (store = initialPaths, action) => {

  switch (action.type) {
    case 'SET_SHORTEST_PATH':
      return {
        ...store,
        pathFC: turf.asFeatureCollection([action.pathFC])
      }

    case 'SET_QUIET_PATHS':
      return {
        ...store,
        pathFC: turf.asFeatureCollection(action.pathFC)
      }

    case 'SET_ORIGIN':
    case 'SET_TARGET':
      return {
        ...store,
        pathFC: turf.asFeatureCollection([])
      }

    case 'RESET_PATHS':
      return initialPaths

    default:
      return store
  }
}

export const getShortestPath = (originCoords, targetCoords) => {
  return async (dispatch) => {
    const pathFC = await paths.getShortestPath(originCoords, targetCoords)
    console.log('pathFC', pathFC)
    dispatch({ type: 'SET_SHORTEST_PATH', pathFC })
  }
}

export const getQuietPaths = (originCoords, targetCoords) => {
  return async (dispatch) => {
    const pathFC = await paths.getQuietPaths(originCoords, targetCoords)
    console.log('quietPaths', pathFC)
    dispatch({ type: 'SET_QUIET_PATHS', pathFC })
  }
}

export default pathsReducer
