const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  expiresIn: Joi.number().default(3600 * 1000 * 12), // 12 hours
  options: Joi.object({
    host: Joi.string(),
    port: Joi.number().default(6379),
    tls: Joi.any(),
    password: Joi.string().allow(''),
    partition: Joi.string().default('ffc-tcg-abaco-agri-stub')
  }),
  partyCacheName: Joi.string().default('parties')
})

const config = {
  options: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    tls: process.env.NODE_ENV === PRODUCTION ? {} : undefined,
    password: process.env.REDIS_PASSWORD,
    partition: process.env.REDIS_PARTITION
  },
  expiresIn: process.env.REDIS_TTL,
  partyCacheName: process.env.REDIS_PARTY_CACHE_NAME
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The cache config is invalid. ${result.error.message}`)
}

const value = result.value

value.useRedis = !value.isTest && value.options.host !== undefined

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

module.exports = value
