/*
 * @Author: scoyzhao 
 * @Date: 2018-06-25 10:23:39 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-07-21 15:46:23
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

router.get('/insertAllCatagory', async (ctx) => {
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

// 获取商品详情
router.post('/getDetailGoodsInfo', async (ctx) => {
    const Good = mongoose.model('Good')
    let goodsId = ctx.request.body.goodsId

    // await Good.findOne({ ID: goodsId }).exec()
    //     // 这里注意一下，一般会等一下这个result，所以加async
    //     .then(async (result) => {
    //         ctx.body = {
    //             code: 200,
    //             message: result,
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         ctx.body = {
    //             code: 500,
    //             message: err,
    //         }
    //     })

    try {
        let result = await Goods.findOne({ ID: goodsId }).exec()
        ctx.body = {
            code: 200,
            message: result,
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error,
        }
    }
})

// 分类页面的数据读取
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {
            code: 200,
            message: result,
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error,
        }
    }
})

// 读取小类(测试)
router.get('/getCategorySubList', async (ctx) => {
    try {
        // 之后用这个
        // let categoryId = ctx.request.body.categoryId
        let categoryId = 1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
        ctx.body = {
            code: 200,
            message: result,
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error,
        }
    }
})


// 根据类别获取商品列表（测试）
router.get('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        //let categorySubId = ctx.request.body.categoryId
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
        const Goods = mongoose.model('Good')
        let result = await Goods.find({ SUB_ID: categorySubId }).exec()
        ctx.body = { 
            code: 200, 
            message: result,
        }
    } catch (error) {
        ctx.body = { 
            code: 500, 
            message: error,
        }
    }
})

module.exports = router
