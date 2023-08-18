const getFullKey = (cacheName, key) => {
  return `${cacheName}:${key}`
}

module.exports = {
  getFullKey
}
