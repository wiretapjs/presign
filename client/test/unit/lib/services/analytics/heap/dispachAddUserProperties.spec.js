import dispatchHeapAddUserProperties from 'lib/services/analytics/heap/dispatchAddUserProperties'

const mockEventBody = {foo: 'FOO'}

describe('addUserProperties', () => {
  Object.defineProperty(window, 'heap', {
    value: {
      addUserProperties: jest.fn(),
    },
    writable: true,
  })

  it('should execute window.heap.addUserProperties if window.heap is loaded', () => {
    dispatchHeapAddUserProperties(mockEventBody)
    expect(window.heap.addUserProperties).toBeCalledWith(mockEventBody)
  })

  it('should not throw if heap fails to load', () => {
    window.heap = undefined
    expect(() => dispatchHeapAddUserProperties(mockEventBody)).not.toThrow()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
