export const asyncFunction = function (callback = () => {}) {
  setTimeout(() => { callback() }, 0)
}

export const asyncFunctionReject = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => { reject(new Error()) }, 0)
  })
}

export const dummyResponseFunction = (req, res) => res.send()
