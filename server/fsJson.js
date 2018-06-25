/*
 * @Author: scoyzhao 
 * @Date: 2018-06-25 10:06:55 
 * @Last Modified by: scoyzhao
 * @Last Modified time: 2018-06-25 10:15:21
 */

const fs = require('fs')

fs.readFile('./json-data/goods.json', 'utf-8', (err, data) => {
    let newData = JSON.parse(data)
    // 提纯之后的
    let pushData = []
    let i = 0

    // image1 != null 就是要的
    newData.RECORDS.map((item, index) => {
        if (item.IMAGE1) {
            i++
            console.log(item.NAME)
            pushData.push(item)
        }
    })
    console.log(i)
    fs.writeFile('./json-data/newGoods.json', JSON.stringify(pushData), (err) => {
        if (err) {
            console.log('写文件操作失败')
        } else {
            console.log('写文件操作成功')
        }
    })
})