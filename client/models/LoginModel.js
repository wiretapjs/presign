class LoginModel {
  constructor (userObj) {
    if (userObj) {
      this.username = userObj.username
      this.email = userObj.email
      this.password = userObj.password
    }
  }
}
export default LoginModel
