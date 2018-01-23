import { setServerEnvironment } from 'test/helpers/environment' //eslint-disable-line
setServerEnvironment('development')
const uuid = require('uuid/v4')
const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
}
jest.mock('pino', () => () => mockLogger)
const logger = require('lib/logger')

describe('Test the logger logic', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('logs the message as info when a valid info message is sent', () => {
    const message = { type: 'info', text: uuid() }
    logger.sendMessage(message)
    expect(mockLogger.info).toHaveBeenCalledWith(message.text)
  })

  it('logs the message as info by default when valid message is sent', () => {
    const message = { text: uuid() }
    logger.sendMessage(message)
    expect(mockLogger.info).toHaveBeenCalledWith(message.text)
  })

  it('logs the message as error when a valid error message is sent', () => {
    const message = { type: 'error', text: uuid() }
    logger.sendMessage(message)
    expect(mockLogger.error).toHaveBeenCalledWith(message.text)
  })

  it('returns the message when the message is sent', () => {
    const message = { type: 'info', text: uuid() }
    const messageSent = logger.sendMessage(message)
    expect(messageSent).toEqual(message)
  })

  it('does not log as info when no message has not been sent', () => {
    const message = {}
    logger.sendMessage(message)
    expect(mockLogger.info).not.toHaveBeenCalled()
  })

  it('does not log as error when no message has not been sent', () => {
    const message = {}
    logger.sendMessage(message)
    expect(mockLogger.error).not.toHaveBeenCalled()
  })
})
