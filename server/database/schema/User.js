/*
 * @Author: scoyzhao 
 * @Date: 2018-05-30 14:45:07 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-05-30 14:51:42
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 这是mongoose原生的
let ObjectId = Schema.Types.ObjectId

// TODO:这里只是介绍，之后会介绍一些实际项目中的，
// 比如说加盐等
const userSchema = new Schema({
    UserId: ObjectId,
    userName: {
        unique: true,
        type: String,
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now(),
    },
    lastLoginAt: {
        type: Date,
        default: Date.now(),        
    },
})

// 发布模型
mongoose.model('User', userSchema)
