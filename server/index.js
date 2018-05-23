/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 15:05:58 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-05-23 15:09:30
 */

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})
