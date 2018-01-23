import config from 'app/config'
import query from 'lib/query'

class Visitor {
  run () {
    config.visitor = {}
    config.visitor.regToken = query.get('token')
  }
}

export default new Visitor()
