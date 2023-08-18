const getCache = (request, cacheName) => {
  return request.server.app[cacheName]
}

module.exports = {
  getCache
}
