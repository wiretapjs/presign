import dispatchHeapIdentification from 'lib/services/analytics/heap/dispatchIdentification'

const mockEventBody = 'FOO'

describe('dispatchHeapIdentification', () => {
  Object.defineProperty(window, 'heap', {
    value: {
      identify: jest.fn(),
    },
    writable: true,
  })

  it('should execute window.heap.identify if window.heap is loaded', () => {
    dispatchHeapIdentification(mockEventBody)
    expect(window.heap.identify).toBeCalledWith(mockEventBody)
  })

  it('should not throw if heap fails to load', () => {
    window.heap = undefined
    expect(() => dispatchHeapIdentification(mockEventBody)).not.toThrow()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
