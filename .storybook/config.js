import 'babel-polyfill'
import { addDecorator, configure } from '@storybook/react'
import appStyles from 'app/App.style'
import environment from 'app/initializers/environment'
import analyticsManager from 'lib/services/analytics/analyticsManager'

function loadStories () {
  const req = require.context('../client', true, /\.stories\.jsx$/)
  req.keys().forEach((filename) => req(filename))
}

addDecorator((story) => {
  environment.run()
  analyticsManager.run()
  appStyles()
  return story()
})

configure(loadStories, module)
