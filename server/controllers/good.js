/*
 * @Author: scoyzhao 
 * @Date: 2018-06-25 10:23:39 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-25 10:33:52
 */

const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./json-data/newGoods.json', 'utf-8', (err, data) => {
        data = JSON.parse(data)
        // 计算插入了多少条
        let saveCount = 0
        const Good = mongoose.model('Good')
        
        data.map((item, index) => {
            let newGood = new Good(item)
            newGood
                .save()
                .then(() => {
                    saveCount++
                    console.log('success' + saveCount)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    })
    ctx.body = '开始导入数据'
})

module.exports = router
