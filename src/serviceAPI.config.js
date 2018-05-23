/*
 * @Author: scoyzhao 
 * @Date: 2018-05-23 14:45:08 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-05-23 15:15:08
 */

/**
 * 设置项目中所使用的api
 */

const BASEURL = 'https://www.easy-mock.com/mock/5ae58725c6c41f6d3e8fc0f5/SmileVue/'
const URL = {
    getShoppingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'goodsInfo',
}

/**
 * 下面这两行等价，意思是暴露一个名为default的变量
 */
// export { URL as default }
export default URL
