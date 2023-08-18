const Hoek = require('@hapi/hoek')
const { get, set } = require('./base')

const update = async (request, cacheName, value) => {
  const existing = await get(request, cacheName)
  Hoek.merge(existing, value, { mergeArrays: false })
  await set(request, cacheName, existing)
  return existing
}

module.exports = {
  update
}
