export default function (body) {
  if (window.heap) {
    window.heap.identify(body)
  }
}
