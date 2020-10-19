import React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import Favicon from './favicon-32x32.png'
import RoutingSettingsRow from './RoutingSettingsRow'
import ShowInfoButton from './ShowInfoButton'
import OrigDestPanel from './OrigDestPanel'
import BasemapSelector from './BasemapSelector'
import AqiMapLegend from './AqiMapLegend'
import { Basemap } from '../../constants'

const VisiblePanel = styled.div`
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.06);
`
const LogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  padding: 6px 4px 0px 9px;
  @media (min-width: 600px) {
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 450;
    padding-bottom: 2px;
  }
  @media (min-width: 1100px) {
    margin-bottom: -20px;
  }
`
const LogoImg = styled.img`
  @media (min-width: 600px) {
    width: 20px;
    height: auto;
  }
`
const GreenPathsLabel = styled.div`
  margin-left: 3px;
  letter-spacing: -0.6px;
`
const LowerTransparentPanel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const LowerLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const LowerRightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const TopPanel = (props: PropsFromRedux) => {
  return (
    <div>
      <VisiblePanel>
        <LogoRow>
          <LogoImg src={Favicon} width="15" height="15" alt="Green Paths app logo" />
          <GreenPathsLabel>
            Green<span style={{ marginLeft: '2px' }}>Paths</span>
          </GreenPathsLabel>
        </LogoRow>
        <OrigDestPanel />
        <RoutingSettingsRow />
      </VisiblePanel>
      <LowerTransparentPanel>
        <LowerLeftPanel>{props.basemap === Basemap.AIR_QUALITY && <AqiMapLegend />}</LowerLeftPanel>
        <LowerRightPanel>
          <ShowInfoButton />
          <BasemapSelector />
        </LowerRightPanel>
      </LowerTransparentPanel>
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  basemap: state.map.basemap,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(TopPanel)
