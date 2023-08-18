const { GET, POST, DELETE } = require('../constants/http-verbs')
const { OK } = require('../constants/ok')

module.exports = [{
  method: GET,
  path: '/master/api-priv/v1/parties',
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}, {
  method: POST,
  path: '/master/api-priv/v1/parties',
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}, {
  method: GET,
  path: '/master/api-priv/v1/parties/{id}',
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}, {
  method: DELETE,
  path: '/master/api-priv/v1/parties/{id}',
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}]
