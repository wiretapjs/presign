import fetchInjectEnsighten from 'lib/services/fetch/fetchInjectEnsighten'
import { asyncFunction } from 'test/helpers/dummy-functions'

window.Bootstrapper = {
  bindPageSpecificCompletion: jest.fn(asyncFunction),
}

const mockDocumentNode = {}

document.createElement = () => {
  return mockDocumentNode
}

document.body.appendChild = () => {}

const triggerScriptOnLoadEvent = function () {
  mockDocumentNode.onload()
}

describe('fetchInjectEnsighten', () => {
  const testScriptUri = 'blah'

  const injectTestScript = async () => {
    await fetchInjectEnsighten.injectScript(testScriptUri)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add script to body', async () => {
    return new Promise((resolve) => {
      injectTestScript().then(() => {
        resolve()
      })
      triggerScriptOnLoadEvent()
    }).then(() => {
      expect(mockDocumentNode.src).toBe(testScriptUri)
    })
  })

  it('should call Bootstrapper.bindPageSpecificCompletion', async () => {
    return new Promise((resolve) => {
      injectTestScript().then(() => {
        resolve()
      })
      triggerScriptOnLoadEvent()
    }).then(() => {
      expect(window.Bootstrapper.bindPageSpecificCompletion).toBeCalled()
    })
  })
})
