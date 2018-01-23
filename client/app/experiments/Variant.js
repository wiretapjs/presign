import sha1 from 'sha1'

export default class Variant {
  constructor (name) {
    this.name = name
    this.analyticsId = sha1(name)
  }
}
