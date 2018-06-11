/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 15:05:58 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-11 10:38:48
 */

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router()

const { connect, initSchemas } = require('./database/init.js')
const user = require('./controllers/user.js')


;(async () => {
    await connect()
    await initSchemas()
    // const User = mongoose.model('User')
    
    // let oneUser = new User({
    //     userName: 'scoyzhao',
    //     password: '123456',
    // })
    // oneUser
    //     .save()
    //     .then(() => {
    //         console.log('success')
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    
    // let user = await User.findOne().exec()
    // console.log(user)
})()

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
