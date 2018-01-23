export const context = describe
export const getMockedCallArgument = (mock, argumentIndex, callIndex = 0) => {
  return mock.calls[callIndex][argumentIndex]
}
