import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'

const mockEventBody = {
  foo: 'bar',
}

describe('dispatchOmniture', () => {
  Object.defineProperty(window, 'digitalData', {
    value: {
      eventListeners: {
        post: jest.fn(),
      },
    },
    writable: true,
  })

  it('should execute digitalData.eventListeners.post if window.digitalData is loaded', () => {
    dispatchOmniture(mockEventBody)
    expect(window.digitalData.eventListeners.post).toBeCalledWith(mockEventBody)
  })

  it('should not throw if Omniture fails to load', () => {
    window.digitalData = undefined
    expect(() => dispatchOmniture(mockEventBody)).not.toThrow()
  })
})
