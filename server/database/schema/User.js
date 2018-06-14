/*
 * @Author: scoyzhao 
 * @Date: 2018-05-30 14:45:07 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-14 09:11:33
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 这是mongoose原生的
let ObjectId = Schema.Types.ObjectId

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

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})

// 发布模型
mongoose.model('User', userSchema, 'User')
