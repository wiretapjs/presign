import PropTypes from 'prop-types'

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node).isRequired,
  PropTypes.node.isRequired,
])

export const historyPropTypes = PropTypes.shape({
  push: PropTypes.func,
})
