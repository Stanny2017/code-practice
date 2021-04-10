/**
 * 题目： var arr = [ {name: 'brick1'}, {name: 'brick2'}, {name: 'brick3'} ]
 * 希望最后返回到 arr 里面每个对象的 name 拼接数据为 'brick1, brick2 & brick3' ，如果用 reduce 如何实现呢？
 */

var arr = [{ name: 'brick1' }, { name: 'brick2' }, { name: 'brick3' }]

const concatName = arr.reduce((previousValue, current, index) => {
    if (index == 0) {
        return current.name
    } else if (index === arr.length - 1) {
        return previousValue + '&' + current.name
    } else {
        return previousValue + ',' + current.name
    }

}, '')

console.log(concatName)
