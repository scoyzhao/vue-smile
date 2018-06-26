/*
 * @Author: scoyzhao 
 * @Date: 2018-06-25 10:23:39 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-26 10:58:24
 */

const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const { resolve } = require('path')

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

router.get('/insertAllCatagory', async(ctx) => {
    fs.readFile(resolve(__dirname, '../json-data/category.json'), 'utf-8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((item, index) => {
            console.log(item)
            let newCategory = new Category(item)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log('失败：' + error)
            })
        })
    })

    ctx.body = '开始导入数据'
})

router.get('/insertAllCatagorySub', async (ctx) => {
    fs.readFile(resolve(__dirname, '../json-data/category_sub.json'), 'utf-8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('CategorySub')
        data.RECORDS.map((item, index) => {
            console.log(item)
            let newCategory = new Category(item)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log('失败：' + error)
            })
        })
    })

    ctx.body = '开始导入数据'
})

module.exports = router
