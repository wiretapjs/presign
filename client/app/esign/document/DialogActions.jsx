import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

const DialogActions = props => {
  return (
    <FlatButton label="CLOSE" type="button" style={{color: '#1F7FC7'}} onClick={props.onClick} />
  )
}

DialogActions.propTypes = {
  onClick: PropTypes.func,
}

export default DialogActions
