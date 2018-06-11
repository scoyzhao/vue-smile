const Router = require('koa-router')

let router = new Router()

router.get('/', async(ctx) => {
    ctx.body = 'user'
})

router.get('/register', async(ctx) => {
    ctx.body = 'user register'
})

module.exports = router
