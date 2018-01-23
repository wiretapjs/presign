import fetchInject from 'lib/services/fetch/fetchInjectEnsighten'
import config from 'app/config'
import { observable, observe } from 'mobx'

class AnalyticsManager {
  @observable analyticsEventsArr = []

  constructor () {
    this.areAnalyticsScriptReady = false
    observe(this.analyticsEventsArr, (change) => {
      this.processQueue()
    })
  }

  processQueue () {
    if (this.areAnalyticsScriptReady) {
      while (this.analyticsEventsArr.length > 0) {
        const analyticsEvent = this.analyticsEventsArr.pop()
        analyticsEvent.dispatch()
      }
    }
  }

  async run () {
    try {
      let scriptUri = ''
      const environment = config.environment
      if (environment === 'localhost') {
        scriptUri = '//nexus.ensighten.com/libertymutual/ccad/Bootstrap.js'
      } else {
        scriptUri = '//nexus.ensighten.com/libertymutual/react/Bootstrap.js'
      }
      await fetchInject.injectScript(scriptUri)
      this.areAnalyticsScriptReady = true
      this.processQueue()
    } catch (e) {
      console.log('React bootstrap load failed')
    }
  }
}

export default new AnalyticsManager()
