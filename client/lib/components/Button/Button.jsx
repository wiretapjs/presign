import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #405C8A;
  padding: 10px;
  width: 200px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`

const Button = (props) => {
  const {label, onClick, heapId} = props
  const handleStyledButtonClick = event => {
    if (onClick) {
      onClick(event)
    }
  }
  return (
    <StyledButton data-heap-id={heapId}
      onClick={handleStyledButtonClick}
      dangerouslySetInnerHTML={{__html: label}}
    />
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  heapId: PropTypes.string,
}

export default Button
