import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { GeoJSONSource } from 'mapbox-gl'

class PathSelected extends React.Component<PropsFromRedux> {
  layerId = 'selectedPath'
  source: GeoJSONSource | undefined
  layout = {
    'icon-image': 'circle-15',
    'icon-size': 0.7,
    'symbol-placement': 'line',
    'symbol-spacing': 22,
    'icon-allow-overlap': true,
    'icon-ignore-placement': true,
  }

  componentDidMount() {
    // @ts-ignore - map is given to all children of Map
    const { map } = this.props
    map.once('load', () => {
      // Add layer
      map.addSource(this.layerId, { type: 'geojson', data: this.props.selPathFC })
      this.source = map.getSource(this.layerId)
      map.addLayer({
        id: this.layerId,
        source: this.layerId,
        type: 'symbol',
        layout: this.layout,
      })
    })
  }

  componentDidUpdate = () => {
    // @ts-ignore - map is given to all children of Map
    const { map } = this.props
    const { selPathFC, lengthLimit } = this.props

    if (this.source !== undefined) {
      // @ts-ignore - it's valid geojson
      this.source.setData(selPathFC)
      map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
    } else {
      map.once('sourcedata', () => {
        if (this.source) {
          // @ts-ignore - it's valid geojson
          this.source.setData(selPathFC)
        }
      })
      map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  selPathFC: state.paths.selPathFC,
  lengthLimit: state.paths.lengthLimit,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(PathSelected)