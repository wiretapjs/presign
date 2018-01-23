import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'

const duration = 250

const defaultStyle = {
  opacity: 0,
  transition: `opacity ${duration}ms ease-in-out`,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

export const FadeIn = (WrappedComponent) => {
  return class FadeInComponent extends Component {
    state = { in: false }

    componentDidMount () {
      this.setState({ in: true })
    }

    render () {
      return (
        <Transition in={this.state.in} timeout={duration}>
          {(state) => (
            <div style={{...defaultStyle, ...transitionStyles[state]}}>
              {<WrappedComponent {...this.props} />}
            </div>
          )}
        </Transition>
      )
    }
  }
}

export default FadeIn
