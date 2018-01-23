import LoginModel from 'models/LoginModel'

jest.mock('lib/services/fetch/fetchApi', () => {
  return {
    request: jest.fn(() => { }),
  }
})

describe('model properties test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set all properties when passed into contructor', () => {
    const testUser = {
      username: 'userName',
      password: 'first',
      email: 'email@email.com',
    }

    const user = new LoginModel(testUser)
    expect(user).toMatchObject(testUser)
  })

  it('should not throw when no options are passed', () => {
    const loginModel = new LoginModel()
    expect(loginModel).not.toBeNull()
  })
})
