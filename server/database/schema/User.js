/*
 * @Author: scoyzhao 
 * @Date: 2018-05-30 14:45:07 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-19 15:28:47
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

// 添加比较密码的代码
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resolve(isMatch)
                } else {
                    reject(err)
                }
            })
        })
    }
}

// 发布模型
mongoose.model('User', userSchema)
