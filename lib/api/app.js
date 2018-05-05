const koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const onerror = require('koa-onerror')

const router = require('./router')

const app = new koa()
onerror(app)

app.use(json({
    pretty: false
}))

app.use(logger())

app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)

// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`[logger][${ctx.ip}] ${ctx.method} ${ctx.url} [${ctx.socket.remoteAddress} ${ctx.socket.remotePort}] - ${ms}ms`)
// })

app.use(router.routes(), router.allowedMethods())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

app.listen(3000, () => {
    console.log(`api server is running on port 3000`)
})