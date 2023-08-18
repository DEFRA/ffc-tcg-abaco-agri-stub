const { CREATE } = require('../constants/crud')
const { DELETE } = require('../constants/http-verbs')

const updateKeys = async (cache, key, action) => {
  const keys = await cache.get('keys')
  const keysArray = keys ?? []
  const index = keysArray.indexOf(key)
  if (action === CREATE) {
    if (index === -1) {
      keysArray.push(key)
    }
  } else if (action === DELETE) {
    if (index > -1) {
      keysArray.splice(index, 1)
    }
  }
  await cache.set('keys', keysArray)
}

module.exports = {
  updateKeys
}
