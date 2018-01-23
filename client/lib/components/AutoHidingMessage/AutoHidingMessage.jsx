import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutoHidingMessage extends Component {
  constructor (props) {
    super(props)
    const ahd = this.props.autoHideDuration
    this.state = {
      display: this.props.display,
      // assumes values less than 1000 are seconds rather than ms
      autoHideDuration: ahd < 1000 ? ahd * 1000 : ahd,
    }
  }

  render () {
    if (this.state.display) {
      return (
        <div style={this.props.divStyle}>
          <span style={this.props.textStyle}>{this.props.message}</span>
        </div>
      )
    }
    return null
  }

  componentDidMount () {
    this.setAutoHide()
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      display: newProps.display,
      message: newProps.message,
      textStyle: newProps.textStyle,
      divStyle: newProps.divStyle,
    }, () => {
      this.setAutoHide()
    })
  }

  setAutoHide () {
    if (this.state.display && this.state.autoHideDuration) {
      setTimeout(() => {
        if (this.state.display) {
          this.setState({
            display: false,
          })
        }
      }, this.state.autoHideDuration)
    }
  }
}

AutoHidingMessage.propTypes = {
  display: PropTypes.bool,
  message: PropTypes.string,
  autoHideDuration: PropTypes.number,
  textStyle: PropTypes.object,
  divStyle: PropTypes.object,
}

AutoHidingMessage.defaultProps = {
  display: false,
  message: '',
  autoHideDuration: null,
  textStyle: null,
  divStyle: null,
}

export default AutoHidingMessage
