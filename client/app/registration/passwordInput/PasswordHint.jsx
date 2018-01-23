import React from 'react'
import FadeIn from 'app/animation/FadeIn'

export const PasswordHint = (props) => {
  const passwordHintContainer = {
    width: 280,
    minHeight: 50,
    padding: 10,
    fontSize: 10,
    backgroundColor: '#5B8ABC',
    color: 'white',
    lineHeight: 1.5,
    position: 'absolute',
    top: 54,
    zIndex: 10,
    borderRadius: 3,
  }

  const arrowUp = {
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid #5B8ABC',
    marginTop: -18,
    marginBottom: 18,
    marginLeft: 15,
  }

  const passwordHintItems = {
    marginTop: 2,
    listStyle: 'none',
    paddingLeft: 10,
  }

  return (
    <div style={passwordHintContainer}>
      <div style={arrowUp} />
      <span>Keep in mind passwords must be 8 characters long and can't:</span>
      <ul style={passwordHintItems}>
        <li>- Contain any spaces</li>
        <li>- Include any of the following special characters: {'/ % < & + >'}</li>
      </ul>
    </div>
  )
}

export default FadeIn(PasswordHint)
