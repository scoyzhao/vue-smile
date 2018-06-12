/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 14:45:08 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-12 09:55:45
 */

/**
 * 设置项目中所使用的api
 */

const BASEURL = 'https://www.easy-mock.com/mock/5ae58725c6c41f6d3e8fc0f5/SmileVue/'
const LOCALURL = 'http://localhost:3000/'

const URL = {
    getShoppingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'goodsInfo',
    registerUser: LOCALURL + 'user/register',
}

/**
 * 下面这两行等价，意思是暴露一个名为default的变量
 */
// export { URL as default }
export default URL
