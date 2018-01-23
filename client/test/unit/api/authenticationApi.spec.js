import authenticationApi from 'api/authenticationApi'
import fetchApi from 'lib/services/fetch/fetchApi'
fetchApi.request = jest.fn()

describe('authentication api test', () => {
  it('should call fetch', async () => {
    await authenticationApi.loginUser('', '')
    expect(fetchApi.request).toHaveBeenCalledTimes(1)
  })
})
