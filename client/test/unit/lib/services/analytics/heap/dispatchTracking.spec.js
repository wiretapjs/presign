import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'

const mockEventBody = 'FOO'

describe('dispatchHeapTracking', () => {
  Object.defineProperty(window, 'heap', {
    value: {
      track: jest.fn(),
    },
    writable: true,
  })

  it('should execute window.heap.track if window.heap is loaded', () => {
    dispatchHeapTracking(mockEventBody)
    expect(window.heap.track).toBeCalledWith(mockEventBody)
  })

  it('should not throw if heap fails to load', () => {
    window.heap = undefined
    expect(() => dispatchHeapTracking(mockEventBody)).not.toThrow()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
