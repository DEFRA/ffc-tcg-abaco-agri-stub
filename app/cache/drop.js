const { DELETE } = require('../constants/crud')
const { getCache } = require('./get-cache')
const { getFullKey } = require('./get-full-key')
const { updateKeys } = require('./update-keys')

const drop = async (request, cacheName, key) => {
  const fullKey = getFullKey(cacheName, key)
  const cache = getCache(request, cacheName)
  await cache.drop(fullKey)
  await updateKeys(cache, fullKey, DELETE)
}

module.exports = {
  drop
}
