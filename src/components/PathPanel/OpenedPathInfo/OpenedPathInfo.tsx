import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'
import { unsetOpenedPath } from '../../../reducers/pathsReducer'
import { PathNoisesBar } from './../PathNoisesBar'
import { PathAqiBar } from './../PathAqiBar'
import { OpenedPathNoiseExps } from './OpenedPathNoiseExps'
import { OpenedPathAqExps } from './OpenedPathAqExps'
import { ClosePathBox } from './../OpenClosePathBoxes'
import { pathTypes, statTypes } from './../../../constants'

const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`
const ExposureBarsFlex = styled.div`
  display: flex;
  width: calc(90% - 21px);
  min-height: 56px;
  flex-direction: column;
  justify-content: space-around;
  margin: 3px 0px 1px 0px;
`
const BarsLabel = styled.div`
  font-size: 14px;
  margin: 1px 0px 5px 0px;
`

const OpenedPathInfo = ({ paths, unsetOpenedPath }: PropsFromRedux) => {
  const { shortPathFC, openedPath, showingStatsType } = paths
  const shortPath = shortPathFC.features[0]

  if (openedPath.properties.type === pathTypes.short) {
    if (showingStatsType === statTypes.aq) {
      return <ShortPathAqiExposures path={openedPath} unsetOpenedPath={unsetOpenedPath} />
    } else {
      return <ShortPathNoiseExposures path={openedPath} unsetOpenedPath={unsetOpenedPath} />
    }
  } else if (showingStatsType === statTypes.aq) {
    return <PathAqiExposures path={openedPath} shortPath={shortPath} unsetOpenedPath={unsetOpenedPath} />
  } else {
    return <PathNoiseExposures path={openedPath} shortPath={shortPath} unsetOpenedPath={unsetOpenedPath} />
  }
}

interface ShortPathExposureProps {
  path: PathFeature,
  unsetOpenedPath: React.MouseEventHandler<HTMLElement>,
}

const ShortPathAqiExposures = ({ path, unsetOpenedPath }: ShortPathExposureProps) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different air quality classes on the selected (shortest) path: </BarsLabel>
          <PathAqiBar withMargins={true} aqiPcts={path.properties.aqi_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex>
      <OpenedPathAqExps path={path} />
    </div>
  )
}

const ShortPathNoiseExposures = ({ path, unsetOpenedPath }: ShortPathExposureProps) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected (shortest) path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex>
      <OpenedPathNoiseExps path={path} />
    </div>
  )
}

interface PathExposureProps extends ShortPathExposureProps {
  shortPath: PathFeature,
}

const PathAqiExposures = ({ path, shortPath, unsetOpenedPath }: PathExposureProps) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different air quality classes on the selected and the shortest path: </BarsLabel>
          <PathAqiBar withMargins={true} aqiPcts={path.properties.aqi_pcts} />
          <PathAqiBar withMargins={true} aqiPcts={shortPath.properties.aqi_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex >
      <OpenedPathAqExps path={path} />
    </div>
  )
}

const PathNoiseExposures = ({ path, shortPath, unsetOpenedPath }: PathExposureProps) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected and the shortest path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
          <PathNoisesBar withMargins={true} noisePcts={shortPath.properties.noise_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex >
      <OpenedPathNoiseExps path={path} />
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  paths: state.paths,
})

const mapDispatchToProps = {
  unsetOpenedPath,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(OpenedPathInfo)
