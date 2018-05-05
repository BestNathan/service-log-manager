const ioredis = require('ioredis')
const config = require('../config')

const redis = new ioredis(config.redisServer, {
    password: config.redisPassword
})

redis.publish('log.remote', JSON.stringify({
    level: 'error',
    content: 'error in smtp'
})).then(c => {
    process.exit(0)
})