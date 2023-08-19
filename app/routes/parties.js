const { v4: uuidv4 } = require('uuid')
const { GET, POST, DELETE, PUT } = require('../constants/http-verbs')
const { OK } = require('../constants/ok')
const { partyCacheName } = require('../config').cacheConfig
const { getAll, get, set, drop, update } = require('../cache')
const { USER } = require('../constants/scopes')

module.exports = [{
  method: GET,
  path: '/master/api-priv/v1/parties',
  options: { auth: { strategy: 'simple', scope: [USER] } },
  handler: async (request, h) => {
    const parties = await getAll(request, partyCacheName)
    return h.response(parties).code(200)
  }
}, {
  method: POST,
  path: '/master/api-priv/v1/parties',
  options: { auth: { strategy: 'simple', scope: [USER] } },
  handler: async (request, h) => {
    const id = uuidv4()
    await set(request, partyCacheName, id, { ...request.payload, id })
    return h.response(OK).code(201)
  }
}, {
  method: GET,
  path: '/master/api-priv/v1/parties/{id}',
  options: { auth: { strategy: 'simple', scope: [USER] } },
  handler: async (request, h) => {
    const party = await get(request, partyCacheName, request.params.id)
    return h.response(party).code(200)
  }
}, {
  method: PUT,
  path: '/master/api-priv/v1/parties/{id}',
  options: { auth: { strategy: 'simple', scope: [USER] } },
  handler: async (request, h) => {
    await update(request, partyCacheName, request.params.id, request.payload)
    return h.response(OK).code(200)
  }
}, {
  method: DELETE,
  path: '/master/api-priv/v1/parties/{id}',
  options: { auth: { strategy: 'simple', scope: [USER] } },
  handler: async (request, h) => {
    await drop(request, partyCacheName, request.params.id)
    return h.response(OK).code(200)
  }
}]
