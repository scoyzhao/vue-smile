/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 15:05:58 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-19 16:07:13
 */

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const router = new Router()

const { connect, initSchemas } = require('./database/init.js')
const user = require('./controllers/user.js')

;(async () => {
    await connect()
    await initSchemas()
})()

app.use(cors())
app.use(bodyParser())
// 装载所有子路由
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})
