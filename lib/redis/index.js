const ioredis = require('ioredis')
const logHandler = require('./log.handler')
const config = require('../config')

const PATTERN_LOG = 'log.*'

const redis = new ioredis(config.redisServer, {
    password: config.redisPassword
})

redis.on('error', e => {
    console.log('redis has an Error: ' + e.message)
})

redis.on('connect', () => {
    console.log('redis connected')
})

redis.psubscribe(PATTERN_LOG).then((count) => {
    console.log('psub: log.* count: ' + count);
}).catch(e => {
    console.log('psub has an Error: ' + e.message)
})

redis.on('pmessage', (pattern, channel, message) => {
    if (pattern == PATTERN_LOG) {
        return logHandler(channel, message)
    }
})