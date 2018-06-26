/*
 * @Author: scoyzhao 
 * @Date: 2018-06-26 10:57:47 
 * @Last Modified by:   scoyzhao 
 * @Last Modified time: 2018-06-26 10:57:47 
 */

const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

const categorySubSchema = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_ID: { type: String },
    MALL_SUB_NAME: { type: String },
    COMMENTS: { type: String },
    SORT: { type: Number }
})

mongoose.model('CategorySub', categorySubSchema)
