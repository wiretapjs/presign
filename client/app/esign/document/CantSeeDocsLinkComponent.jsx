import React, { Component } from 'react'
import autoBind from 'react-autobind'
import * as analytics from './analytics'
import CantSeeDocsLink from './CantSeeDocsLink'

class CantSeeDocsLinkComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {openDialog: false}
    autoBind(this)
  }

  openCantSeeDialog () {
    this.setState({openDialog: true})
    analytics.recordEsignCantSeeDocumentClick()
  }

  closeCantSeeDialog () {
    this.setState({openDialog: false})
  }

  render () {
    return (
      <CantSeeDocsLink
        isOpen={this.state.openDialog}
        openDialog={this.openCantSeeDialog}
        closeDialog={this.closeCantSeeDialog}
      />
    )
  }
}

export default CantSeeDocsLinkComponent
