import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled, { css } from 'styled-components'
import { Button } from '../../components/Button'
import { showInfo, hideInfo, Lang } from './../../reducers/uiReducer'
import CookieConsent from './CookieConsent'
import HYLogoFi from '../Images/HY_fi.png'
import HYLogoEn from '../Images/HY_en.png'
import HopeLogo from '../Images/Hope_black_url.png'
import UIALogo from '../Images/logo_uia_2.png'
import EU from '../Images/EU.png'
import ToggleLanguageButtons from './ToggleLanguageButtons'
import T from '../../utils/translator/Translator'
import { text } from '../../utils/translator/dictionary'

const InfoContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  pointer-events: none;
`
const FlexDiv = styled.div<{ gaDisabled: boolean }>`
  align-self: center;
  width: 750px;
  max-width: 85%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  ${props => props.gaDisabled === true && css`
    width: 670px;
  `}
`
const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.6px;
  padding: 18px 27px 5px 27px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-weight: 300;
  color: black;
  font-size: 14px;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.22), 0 6px 20px 0 rgba(0,0,0,0.14);
`
const InfoWrapper = styled.div`
  max-height: 68vh;
  overflow: auto;
`
const Title = styled.div`
  font-weight: 300;
  font-size: 21px;
  padding: 9px 0 11px 0;
`
const SubHeading = styled.div`
  margin: 7px 0px 0px 0px;
  font-weight: 550;
`
const P = styled.div`
  padding: 7px 0px 5px 0;
  line-height: 1.3;
  font-weight: 350;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: rgb(40, 40, 40);
`
const SponsorsDiv = styled.div<{ showLogos: boolean }>`
  position: initial;
  bottom: 0;
  background: rgba(255, 255, 255, 0.97);
  width: 100%;
  padding-top: 12px;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  ${props => props.showLogos && css`
    position: sticky;
  `}
`

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 0 5px 0px;
`
const Link = styled.a`
  color: black;
`
const LogoFlex = styled.div`
  display: flex;
  margin: 0px 0px 6px 0px;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-top: 1px solid black;
  padding-top: 15px;
`
const LogoWrapper = styled.div`
  margin: 0 5px 0 5px;
`
const SmallText = styled.div`
  font-size: 12px;
`
const StyledLogoLink = styled.a`
  margin: 0 5px 0 5px;
  pointer-events: auto;
  cursor: pointer;
`

const WelcomeInfo = (props: PropsFromRedux) => {
  const [showLogos, setShowLogos] = useState(true)

  useEffect(() => setShowLogos(true), [props.ui.info])

  if (!props.ui.info) return null

  return (
    <InfoContainer>
      <FlexDiv gaDisabled={props.gaDisabled}>
        <WhiteBox>
          <InfoWrapper onClick={() => setShowLogos(false)} onScroll={() => setShowLogos(false)}>
            <ToggleLanguageButtons size={16} />
            <Title><T>info_modal.welcome.title</T> (demo)!</Title>
            {!props.visitedBefore && !props.gaDisabled && <P><CookieConsent /></P>}
            <P>
              <SmallText>
                <T>info_modal.dev_status_info</T>
              </SmallText>
            </P>
            <SubHeading><T>info_modal.user_feedback.title</T></SubHeading>
            <P>
              <T>info_modal.user_feedback.content_1</T><Link href={text(props.ui.lang, 'info_modal.user_feedback.link_address')}
                target='_blank' rel='noopener noreferrer'><T>info_modal.user_feedback.link_label</T></Link>
            </P>
            <SubHeading><T>info_modal.why.title</T></SubHeading>
            <P>
              <T>info_modal.why.content</T>
            </P>
            <SubHeading><T>info_modal.how.title</T></SubHeading>
            <P>
              <T>info_modal.how.content</T>
            </P>
            <SubHeading><T>info_modal.what.title</T></SubHeading>
            <P>
              <T>info_modal.what.content.enfuser.description</T> <Link href='https://en.ilmatieteenlaitos.fi/environmental-information-fusion-service' target='_blank' rel='noopener noreferrer'>
                <T>info_modal.what.content.enfuser.link_label</T></Link>.
            </P>
            <P>
              <Link href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017' target='_blank' rel='noopener noreferrer'>
                <T>info_modal.what.content.noise_data.link_label</T></Link>{' '} <T>info_modal.what.content.noise_data.description</T>
            </P>
            <P>
              <T>info_modal.what.content.osm.description</T> <Link href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>
                OpenStreetMap</Link> <T>info_modal.what.content.osm.suffix</T>(CC-BY-SA).
            </P>
            <SubHeading><T>info_modal.who.title</T></SubHeading>
            <P>
              <T>info_modal.who.content.developed_by</T> <Link href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                Digital Geography Lab</Link><T>info_modal.who.content.developed_by.suffix</T> <T>info_modal.who.content.within_the</T> <Link href='https://ilmanlaatu.eu/briefly-in-english/' target='_blank' rel='noopener noreferrer'>
                Urban Innovative Action: HOPE</Link>{' '} – <T>info_modal.who.content.hope_description</T>
            </P>
            <SubHeading> <T>info_modal.code.title</T> </SubHeading>
            <P>
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-ui' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-ui</Link>{' '}
              <br />
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-server' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-server</Link>{' '}
            </P>
Sh            {props.visitedBefore && !props.gaDisabled && <P style={{ marginTop: '5px' }}><CookieConsent /></P>}
            <SponsorsDiv showLogos={showLogos && !props.visitedBefore}>
              <LogoFlex>
                {props.ui.lang === Lang.FI &&
                  <StyledLogoLink href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                    <img src={HYLogoFi} width="61" height="57" alt='HYLogoFi' />
                  </StyledLogoLink>
                }
                {props.ui.lang === Lang.EN &&
                  <StyledLogoLink href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                    <img src={HYLogoEn} width="69" height="57" alt='HYLogoEn' />
                  </StyledLogoLink>
                }
                <StyledLogoLink href='https://ilmanlaatu.eu/' target='_blank' rel='noopener noreferrer'>
                  <img src={HopeLogo} width="116" height="30" alt='HopeLogo' />
                </StyledLogoLink>
                <StyledLogoLink href='https://www.uia-initiative.eu/en/uia-cities/helsinki' target='_blank' rel='noopener noreferrer'>
                  <img src={UIALogo} width='106' height='53' alt='UIALogo' />
                </StyledLogoLink>
                <LogoWrapper><img src={EU} width="90" height='60' alt='EULogo' /></LogoWrapper>
              </LogoFlex>
              <SmallText>
                <T>info_modal.funded_by</T>
              </SmallText>
            </SponsorsDiv>
          </InfoWrapper>
          <ButtonDiv id='hide-welcome-button'>
            <Button small green onClick={props.hideInfo}>OK</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </InfoContainer>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  ui: state.ui,
  visitedBefore: state.visitor.visitedBefore,
  gaDisabled: state.visitor.gaDisabled,
})

const connector = connect(mapStateToProps, { showInfo, hideInfo })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(WelcomeInfo)