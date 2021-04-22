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

// console.log(concatName)


/**
 * 数组扁平化
 */

function flatten_1(arr) {
    if (!(arr instanceof Array)) {
        throw new TypeError('param must be array')
    }

    const result = []
    const fn = (arr) => {
        for (let item of arr) {
            if (item instanceof Array) {
                fn(item)
            } else {
                result.push(item)
            }
        }
    }
    fn(arr)

    return result
}

function flatten(arr) {
    const res = arr.reduce((previousValue, current) => {
        if (Array.isArray(current)) {
            return previousValue.concat(flatten(current))
        } else {
            return previousValue.concat(current)
        }
    }, []);

    return res;
}

// console.log(flatten([['item', [[[1, 2, 3], ['test', 'test2']]]], 'out']))


/**
 * 数组去重
 * 
 * 普通对象的 key 值只能是 string or symbol 类型
 */

function deDuplicate_1(arr) {
    const map = new Map()
    const res = []

    for (let item of arr) {
        if (map.has(item)) continue
        map.set(item)
    }

    for (let [key] of map.entries()) {
        res.push(key)
    }
    return res
}

function deDuplicate_2(arr) {
    return [...new Set(arr)]
}


function deDuplicate(arr) {
    const res = []

    for (let item of arr) {
        if (res.indexOf(item) == -1) {
            res.push(item)
        }
    }

    return res
}

console.log(deDuplicate([3, 2, true, 'test', 'test', undefined, undefined, null, null, false, false, {}, {}, 3, 2]))