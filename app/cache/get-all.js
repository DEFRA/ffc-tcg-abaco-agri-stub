const { getCache } = require('./get-cache')

const getAll = async (request, cacheName) => {
  const cache = getCache(request, cacheName)
  const keys = await cache.get('keys') ?? []
  const promises = keys.map(async key => {
    const object = await cache.get(key)
    return object
  })
  const objects = await Promise.all(promises)
  return objects.filter(x => x !== null)
}

module.exports = {
  getAll
}
