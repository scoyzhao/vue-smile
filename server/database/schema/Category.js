/*
 * @Author: scoyzhao 
 * @Date: 2018-06-26 09:47:08 
 * @Last Modified by:   scoyzhao 
 * @Last Modified time: 2018-06-26 09:47:08 
 */

const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

const categorySchema = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_NAME: { type: String },
    IMAGE: { type: String },
    TYPE: { type: Number },
    SORT: { type: Number },
    COMMENTS: { type: String }
})

mongoose.model('Category', categorySchema)
