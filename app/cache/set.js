const { CREATE } = require('../constants/crud')
const { getCache } = require('./get-cache')
const { getFullKey } = require('./get-full-key')
const { updateKeys } = require('./update-keys')

const set = async (request, cacheName, key, value) => {
  const fullKey = getFullKey(cacheName, key)
  const cache = getCache(request, cacheName)
  await cache.set(fullKey, value)
  await updateKeys(cache, fullKey, CREATE)
}

module.exports = {
  set
}
