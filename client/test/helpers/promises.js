export const flushPromises = function () {
  return new Promise(resolve => setImmediate(resolve))
}
