const { getCache } = require('./get-cache')
const { getFullKey } = require('./get-full-key')

const get = async (request, cacheName, key) => {
  const fullKey = getFullKey(cacheName, key)
  const cache = getCache(request, cacheName)
  const object = await cache.get(fullKey)
  return object ?? {}
}

module.exports = {
  get
}
