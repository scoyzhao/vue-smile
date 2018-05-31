/*
 * @Author: scoyzhao 
 * @Date: 2018-05-27 19:04:17 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-05-31 10:45:34
 */

const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

const db = 'mongodb://localhost/smile-db'

mongoose.Promise = global.Promise

module.exports = {
    //载入文件
    initSchemas: () => {
        glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
    },
    //连接数据库
    connect: () => {
        let maxConnectTimes = 0
        //连接
        mongoose.connect(db)

        return new Promise((resolve, reject) => {
            //增加数据库监听事件
            mongoose.connection.on('disconnected', () => {
                console.log('***********数据库断开***********')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject()
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }
            })
            //监听错误事件
            mongoose.connection.on('error', err => {
                console.log('***********数据库错误***********')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject(err)
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }
            })
            //链接打开的时候
            mongoose.connection.once('open', () => {
                console.log('MongoDB connected successfully')
                resolve()
            })
        })
    },
}
