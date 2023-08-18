const { OK } = require('../constants/ok')

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    auth: false
  },
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}
