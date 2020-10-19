import React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { AqiClass, aqiClassColors } from '../../constants'
import LoadAnimation from './../LoadAnimation/LoadAnimation'
import T from '../../utils/translator/Translator'

const Container = styled.div`
  margin: 7px 5px 5px 5px;
`
const LegendBox = styled.div`
  background-color: #000000c2;
  color: white;
  padding: 10px 8px 8px 8px;
  border-radius: 5px;
`
const ColorRow = styled.div`
  display: flex;
  margin-bottom: 3px;
`
const ColorBox = styled.div`
  border-radius: 4px;
  margin: 0px 3px;
  width: 15px;
  height: 15px;
`
const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 5px 0px 5px;
`
const LoadAnimationWrapper = styled.div`
  margin: 7px 6px 7px 5px;
`

const AqiMapLegend = (props: PropsFromRedux) => {
  const { loadingData, waitingStyleUpdate, updatingStyle } = props.aqLayer
  return (
    <Container>
      <LegendBox>
        <ColorRow>
          {Array.from({ length: 8 }, (_, i) => i + 2).map((k: number) => (
            <ColorBox
              key={k.toString()}
              style={{ backgroundColor: aqiClassColors[k as AqiClass] }}
            />
          ))}
        </ColorRow>
        <LabelRow>
          <div>
            <T>basemap.air_quality.legend.label.good</T>
          </div>
          <div>
            <T>basemap.air_quality.legend.label.bad</T>
          </div>
        </LabelRow>
      </LegendBox>
      {(loadingData || waitingStyleUpdate || updatingStyle) && (
        <LoadAnimationWrapper>
          <LoadAnimation size={30} color={'white'} />
        </LoadAnimationWrapper>
      )}
    </Container>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  aqLayer: state.airQualityLayer,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AqiMapLegend)
