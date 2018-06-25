/*
 * @Author: scoyzhao 
 * @Date: 2018-06-25 10:19:28 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-25 10:21:43
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodSchema = new Schema({
    ID: { unique: true, type: String },
    GOODS_SERIAL_NUMBER: String,
    SHOP_ID: String,
    SUB_ID: String,
    GOOD_TYPE: Number,
    STATE: Number,
    NAME: String,
    ORI_PRICE: Number,
    PRESENT_PRICE: Number,
    AMOUNT: Number,
    DETAIL: String,
    BRIEF: String,
    SALES_COUNT: Number,
    IMAGE1: String,
    IMAGE2: String,
    IMAGE3: String,
    IMAGE4: String,
    IMAGE5: String,
    ORIGIN_PLACE: String,
    GOOD_SCENT: String,
    CREATE_TIME: String,
    UPDATE_TIME: String,
    IS_RECOMMEND: Number,
    PICTURE_COMPERSS_PATH: String
})

mongoose.model('Good', goodSchema)
