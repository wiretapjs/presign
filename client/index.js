import React from 'react'
import ReactDOM from 'react-dom'
import environment from 'app/initializers/environment'
import analyticsManager from 'lib/services/analytics/analyticsManager'
import visitor from 'app/initializers/visitor'
import { identifyUser as analyticsIdentifyUser } from './app/analytics'
import registrationApi from './api/registrationApi'
import App from './app/App'

// RUN INITIALIZERS
environment.run()
visitor.run()
analyticsManager.run()
registrationApi.getUserInfo(analyticsIdentifyUser)

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <App />,
  document.getElementById('root'),
)
