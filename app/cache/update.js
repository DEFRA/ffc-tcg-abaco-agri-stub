const Hoek = require('@hapi/hoek')
const { get } = require('./get')
const { set } = require('./set')

const update = async (request, cacheName, key, value) => {
  const existing = await get(request, cacheName, key)
  Hoek.merge(existing, value, { mergeArrays: false })
  await set(request, cacheName, key, existing)
  return existing
}

module.exports = {
  update
}
