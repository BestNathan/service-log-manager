const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

router
    .prefix('/log')
    .post('/:model', async ctx => {
        let { level, content } = ctx.request.body
        if (!level || !content) {
            ctx.status = 200
            ctx.body = '-1'
            return
        }
        let { model } = ctx.params

        if (!model) {
            ctx.status = 200
            ctx.body = '-2'
            return
        }

        model = mongoose.getModel(model)

        if (!model) {
            ctx.status = 200
            ctx.body = '0'
            return
        }

        new model({
            level,
            content
        }).save((err, doc) => {
            if (err) {
                console.log('log save has an Error: ' + err.message)
            }
        })
        ctx.body = '1'
    })

module.exports = router
