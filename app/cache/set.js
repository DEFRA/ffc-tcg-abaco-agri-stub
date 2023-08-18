const { getCache } = require('./get-cache')
const { getFullKey } = require('./get-full-key')

const set = async (request, cacheName, key, value) => {
  const fullKey = getFullKey(cacheName, key)
  const cache = getCache(request, cacheName)
  await cache.set(fullKey, value)
}

module.exports = {
  set
}
