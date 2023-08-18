const getCache = (request, cacheName) => {
  return request.server.app.cache[cacheName]
}

module.exports = {
  getCache
}
