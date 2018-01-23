export default function (session) {
  if (session.hasOwnProperty('signerCount')) {
    return session.signerCount
  } else {
    return null
  }
}
