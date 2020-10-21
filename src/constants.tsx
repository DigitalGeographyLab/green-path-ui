import hmaPoly from './HMA.json'

export const extentFeat = hmaPoly.features[0] as PolygonFeature

export enum Basemap {
  STREETS = 'mapbox://styles/joose/cjvbyzwuk31oe1fohk6s9ev4b',
  NOISE = 'mapbox://styles/joose/ckenvi8t83bbc19qqq3io2zvu',
  AIR_QUALITY = 'mapbox://styles/joose/ckg3ie4ln1pqp19rzjfpjf5c1',
  SATELLITE = 'mapbox://styles/joose/ckf9du1ua28cj19mk96oidub3',
}

export enum LayerId {
  USER_LOC = 'userLoc',
  ORIG_DEST = 'origDest',
  SHORT_PATH = 'pathShort',
  GREEN_PATHS = 'pathsGreen',
  SELECTED_PATH = 'pathSelected',
  PATHS_EDGES = 'pathsEdges',
  BASEMAP = 'baseMapLayer',
  AQI_LAYER = 'aqistreetshma',
}

export enum TravelMode {
  WALK = 'walk',
  BIKE = 'bike',
}

export enum ExposureMode {
  CLEAN = 'clean',
  QUIET = 'quiet',
}

export enum PathType {
  SHORT = 'short',
  CLEAN = 'clean',
  QUIET = 'quiet',
}

export enum StatsType {
  AQ = 'air quality',
  NOISE = 'noise',
}

export const dBColors = {
  40: '#00EC00',
  45: '#00EC00',
  50: '#56FF3B',
  55: '#C6F519',
  60: '#FFD000',
  65: '#FF6E1B',
  70: '#FF270E',
  75: '#FF270E',
}

export const aqiLabels = {
  1: 'air_quality_label.good',
  2: 'air_quality_label.satisfactory',
  3: 'air_quality_label.fair',
  4: 'air_quality_label.poor',
  5: 'air_quality_label.very_poor',
}

export const aqiColors = {
  1: '#00EC00',
  2: '#C6F519',
  3: '#FFD000',
  4: '#FF6E1B',
  5: '#FF270E',
}

export type AqiClass = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const aqiClassColors = {
  2: '#1a9850',
  3: '#66bd63',
  4: '#a6d96a',
  5: '#d9ef8b',
  6: '#fee08b',
  7: '#fdae61',
  8: '#f46d43',
  9: '#d73027',
  10: '#d73027',
} as Record<AqiClass, string>

export const menu = {
  lengthLimitSelector: 'length_limit_selector',
  pathList: 'path_list',
}

export const walkSpeed = 1.33

export const bikeSpeed = 4.15

export const clickTol = 12

export const initialMapCenter = { lng: 24.9664, lat: 60.211 }

export const initialMapCenterProd = { lng: 24.937886, lat: 60.180808 }

export const egOrigin = {
  type: 'Feature',
  properties: {
    label: '24.969963 60.21743',
    locationType: 'map',
    odType: 'orig',
  },
  geometry: {
    type: 'Point',
    coordinates: [24.969963133335114, 60.21743118046364],
  },
}

export const egDest = {
  type: 'Feature',
  properties: {
    label: '24.9628257 60.2052225',
    locationType: 'map',
    odType: 'dest',
  },
  geometry: {
    type: 'Point',
    coordinates: [24.96282577514648, 60.20522256018594],
  },
}
