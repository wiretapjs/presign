export default function (body) {
  if (window.digitalData) {
    window.digitalData.eventListeners.post(body)
  }
}
