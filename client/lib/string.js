export const capitalize = function (string) {
  if (!string) throw new Error('Undefined input')
  return string.charAt(0).toUpperCase() + string.slice(1)
}
