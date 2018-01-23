import React from 'react'
import Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { StyledLink } from './HelpLink.style'
import { StyledCantseeLinkWrapper } from './CantSeeDocsLink.style'
import DialogActions from './DialogActions'

const CantSeeDocsLink = props => {
  return (
    <StyledCantseeLinkWrapper>
      <StyledLink onClick={props.openDialog}>Can't see your documents?</StyledLink>
      <Dialog
        title="Check your browser settings"
        actions={[<DialogActions onClick={props.closeDialog} />]}
        modal={false}
        contentStyle={{ borderTop: `5px solid #ECAC00` }}
        open={props.isOpen}
        onRequestClose={props.closeDialog}
      >
        <p>Please update your settings to:</p>
        <ol>
          <li>Always allow cookies</li>
          <li>Turn off any ad blockers or add-ons</li>
        </ol>
        <p>Once your settings are updated, refresh your browser for the documents to load.</p>
      </Dialog>
    </StyledCantseeLinkWrapper>
  )
}

CantSeeDocsLink.propTypes = {
  isOpen: PropTypes.bool,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
}

export default CantSeeDocsLink
