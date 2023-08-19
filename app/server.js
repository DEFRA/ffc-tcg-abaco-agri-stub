const Hapi = require('@hapi/hapi')
const AuthBearer = require('hapi-auth-bearer-token')
const { serverConfig, cacheConfig } = require('./config')
const Catbox = cacheConfig.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')
const catboxOptions = cacheConfig.useRedis ? cacheConfig.options : {}

const createServer = async () => {
  const server = Hapi.server({
    port: serverConfig.port,
    cache: [{
      name: cacheConfig.partyCacheName,
      provider: {
        constructor: Catbox,
        options: catboxOptions
      }
    }],
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  const partyCache = server.cache({ cache: cacheConfig.partyCacheName, segment: cacheConfig.partyCacheName, expiresIn: cacheConfig.expiresIn })
  server.app.cache = { [cacheConfig.partyCacheName]: partyCache }

  await server.register(AuthBearer)
  await server.register(require('./plugins/auth'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))
  if (serverConfig.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = {
  createServer
}
