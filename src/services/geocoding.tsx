import { GeocodingResult } from '../types'

const baseUrl =
  process.env.REACT_APP_DT_GEOCODING_URL || 'https://dev-api.digitransit.fi/geocoding/v1/search?'

const getParamString = (params: Record<string, any>): string => {
  let str = ''
  for (let key in params) {
    if (str !== '') {
      str += '&'
    }
    str += key + '=' + params[key]
  }
  return str
}

const hmaBoundaryPoly =
  '25.5345 60.2592,25.3881 60.1693,25.3559 60.103,25.3293 59.9371,24.2831 59.78402,24.2721 59.95501,24.2899 60.00895,24.3087 60.01947,24.1994 60.12753,24.1362 60.1114,24.1305 60.12847,24.099 60.1405,24.0179 60.1512,24.0049 60.1901,24.0445 60.1918,24.0373 60.2036,24.0796 60.2298,24.1652 60.2428,24.3095 60.2965,24.3455 60.2488,24.428 60.3002,24.5015 60.2872,24.4888 60.3306,24.5625 60.3142,24.5957 60.3242,24.6264 60.3597,24.666 60.3638,24.7436 60.3441,24.9291 60.4523,24.974 60.5253,24.9355 60.5131,24.8971 60.562,25.0388 60.5806,25.1508 60.5167,25.1312 60.4938,25.0385 60.512,25.057 60.4897,25.0612 60.4485,25.1221 60.4474,25.1188 60.4583,25.149 60.4621,25.1693 60.5062,25.2242 60.5016,25.3661 60.4118,25.3652 60.3756'

interface GeocodingFeatureCollection {
  bbox?: [number, number, number, number]
  features: GeocodingResult[]
  type: 'FeatureCollection'
}

export const geocodeAddress = async (
  text: string,
  resultCount: number,
): Promise<GeocodingResult[]> => {
  const params = {
    text,
    'boundary.polygon': hmaBoundaryPoly,
    size: resultCount,
    lang: 'fi',
    sources: 'oa,osm,nlsfi',
    'digitransit-subscription-key': process.env.REACT_APP_DT_GEOCODING_KEY || '',
  }
  const uri = baseUrl + getParamString(params)
  const response = await fetch(encodeURI(uri))
  const data = (await response.json()) as GeocodingFeatureCollection
  // filter out duplicate results by label
  return data.features.filter((feat, index, self) => {
    return (
      index ===
      self.findIndex(fFeat => {
        return feat.properties.label === fFeat.properties.label
      })
    )
  })
}
