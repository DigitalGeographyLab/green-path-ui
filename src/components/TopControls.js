import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import DetourLimitInput from './DetourLimitInput'
import { useUserLocationOrigin } from '../reducers/originTargetReducer'

const ControlBox = styled.div`
  margin: 0px;
  background-color: rgba(255,255,255,0.95);
  padding: 3px 5px 2px 5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15), 0 6px 20px 0 rgba(0,0,0,0.09);
  justify-content: center;
  @media (min-width:591px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
const ButtonFlex = styled.div`
  @media (max-width: 590px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    }
  @media (min-width:591px) {
    margin: 0 0 0 5px;
    }
`

class TopControls extends Component {
  render() {
    const { userLocFC, detourLimit, useUserLocOrigin, sPathFC, waitingPaths, detourLimits } = this.props
    const showingPaths = sPathFC.features.length > 0 || waitingPaths

    const hideDetourLimitInput = detourLimit === 0 || detourLimits.length < 2
    const hideUserLocButton = useUserLocOrigin || showingPaths

    if (hideDetourLimitInput && hideUserLocButton) return null
    return (
      <ControlBox>
        {hideDetourLimitInput ? null : <DetourLimitInput />}
        {hideUserLocButton
          ? null
          : <ButtonFlex>
            <Button small onClick={() => this.props.useUserLocationOrigin(userLocFC)}> Use current location</Button>
          </ButtonFlex>}
      </ControlBox>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocFC: state.userLocation.userLocFC,
  detourLimit: state.paths.detourLimit,
  detourLimits: state.paths.detourLimits,
  useUserLocOrigin: state.originTarget.useUserLocOrigin,
  sPathFC: state.paths.sPathFC,
  waitingPaths: state.paths.waitingPaths,
})

const ConnectedTopControls = connect(mapStateToProps, { useUserLocationOrigin })(TopControls)

export default ConnectedTopControls