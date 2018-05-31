/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 15:05:58 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-05-31 09:29:34
 */

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')

const { connect, initSchemas } = require('./database/init')

;(async () => {
    await connect()
    await initSchemas()
    const User = mongoose.model('User')
    
    let oneUser = new User({
        userName: 'scoyzhao',
        password: '123456',
    })
    oneUser
        .save()
        .then(() => {
            console.log('success')
        })
        .catch((err) => {
            console.log(err)
        })
    
    let user = await User.findOne().exec()
    console.log(user)
})()

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})
