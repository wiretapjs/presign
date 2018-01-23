export default function (body) {
  if (window.heap) {
    window.heap.addUserProperties(body)
  }
}
