class AnalyticsEvent {
  constructor (body, dispatchHandler) {
    this.body = body
    this.dispatchHandler = dispatchHandler
  }

  dispatch () {
    this.dispatchHandler(this.body)
  }
}

export default AnalyticsEvent
