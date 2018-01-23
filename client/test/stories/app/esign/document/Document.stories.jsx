import React from 'react'
import { storiesOf } from '@storybook/react'
import Document from 'app/esign/document/Document'
import muiTheme from 'app/muiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

storiesOf('Document', module)
  .add('', () => {
    return (<MuiThemeProvider muiTheme={muiTheme}>
      <Document />
    </MuiThemeProvider>)
  })
