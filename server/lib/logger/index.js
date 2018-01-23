const pino = require('pino')()

const sendMessage = message => {
  const { type = 'info', text = '' } = message
  if (text) {
    if (type === 'error') pino.error(text)
    pino.info(text)
  }
  return message
}

module.exports = {
  sendMessage,
}
