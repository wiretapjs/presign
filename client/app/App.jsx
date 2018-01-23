import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import config from 'app/config'
import injectTapEventPlugin from 'react-tap-event-plugin'
import WelcomeController from './welcome/Welcome'
import ConfirmationController from './esign/confirmation/Controller'
import RegistrationController from './registration/Registration'
import ESignLoadingController from './esign/loading/Controller'
import ESignDocumentView from './esign/document/Document'
import AppStyles from './App.style'
import muiTheme from './muiTheme'

// Required for Material UI.  SEe docs for react-tap-event-plugin
injectTapEventPlugin()

const Welcome = (props) => (<WelcomeController regToken={config.visitor.regToken} {...props} />)
const Confirmation = (props) => (
  <ConfirmationController {...props} />
)
const Registration = (props) => {
  return (
    <RegistrationController regToken={config.visitor.regToken} {...props} />
  )
}
const ESignLoading = (props) => (<ESignLoadingController {...props} />)
const ESignDocument = (props) => (<ESignDocumentView {...props} />)

class App extends Component {
  constructor () {
    super()
    AppStyles()
  }

  render () {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{height: '100vh'}}>
            <Route exact path="/" component={Welcome} />
            <Route path="/esign/loading" component={ESignLoading} />
            <Route path="/esign/document" component={ESignDocument} />
            <Route path="/esign/confirmation" component={Confirmation} />
            <Route path="/registration" component={Registration} />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
