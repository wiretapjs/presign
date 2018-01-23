export default function (environment) {
  let value
  if (typeof environment === 'undefined') {
    value = 'http://localhost:3000/'
  } else {
    value = `https://welcome-insurance-${environment}.libertymutual.com/`
  }

  Object.defineProperty(window.location, 'href', {
    writable: true,
    value,
  })
}
