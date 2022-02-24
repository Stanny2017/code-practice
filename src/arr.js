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


function flatWithDepth(arr, depth = 1) {
    if (depth < 1) {
        return arr
    }

    return arr.reduce((prev, curr) => {
        if (Array.isArray(curr)) {
            prev.concat(flatWithDepth(curr, depth - 1))
        } else {
            prev.concat(curr)
        }
    }, [])
}

/**
 * 数组去重
 * 
 * 普通对象的 key 值只能是 string or symbol 类型
 */

function deDuplicate_1(arr) {
    const map = new Map()

    for (let item of arr) {
        if (map.has(item)) continue
        map.set(item)
    }

    return [...map.keys()]
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

/**
 * @param {number[]} nums
 * @return {number} 返回不重复的下标
 * 有序数组，原地删除重复元素
 */
var removeDuplicates = function (nums) {
    let left = 0;
    let right = 1;
    while (right < nums.length) {
        if (nums[left] === nums[right]) {
            right++;
        } else {
            left++;
            nums[left] = nums[right];
        }
    }

    return left + 1;
};


/**
 * @param {number[]} prices
 * @return {number}
 * 提前预知股票价值，计算最大收益
 */
var maxProfit = function (prices) {
    // 卖出时机，高点，比前一天和后一天的价格都要高
    // 买入时机，低点，比前一天和后一天的价格都要低

    let min = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length - 1; i++) {
        const last = prices[i - 1];
        const next = prices[i + 1];
        const curr = prices[i];
        if (curr > last && curr > next) {
            maxProfit += curr - min;
        }

        if (curr < last && curr < next) {
            min = curr;
        }
    }
    return maxProfit;
};

console.log(maxProfit([1, 2, 3, 4, 5]))