import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import {StyledIframe, StyledIframeLoadingWrapper, StyledIframeLoading} from './EsignIframe.style'

class EsignIframe extends Component {
  constructor (props) {
    super(props)
    this.state = {showLoading: true}
    autoBind(this)
  }

  receiveMessage (event) {
    const origin = event.origin || event.originalEvent.origin
    const data = event.data
    switch (data) {
      case 'ESL:MESSAGE:REGISTER':
        event.source.postMessage('ESL:MESSAGE:ACTIVATE_EVENTS', origin)
        break
      case 'ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE':
        event.source.postMessage('ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE', origin)
        break
      default:
        event.source.postMessage(data, origin)
        break
    }
    this.props.esignEvents(data, origin)
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage, false)
  }

  iframeOnLoadEvent () {
    this.setState({showLoading: false})
  }

  renderLoading () {
    if (this.state.showLoading) {
      return <StyledIframeLoading> Loading... </StyledIframeLoading>
    }
    return null
  }

  render () {
    const { url } = this.props
    return (
      <StyledIframeLoadingWrapper>
        {this.renderLoading()}
        <StyledIframe src={url} frameBorder="0" onLoad={this.iframeOnLoadEvent} />
      </StyledIframeLoadingWrapper>
    )
  }
}

EsignIframe.propTypes = {
  url: PropTypes.string,
  esignEvents: PropTypes.func,
}

export default EsignIframe
