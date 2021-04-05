// 深浅拷贝区别：对于引用类型的子元素，是只复制内存地址，还是完全复制，彻底实现内存上的分离
// 浅拷贝
function getTypeOf(v) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}

function shallowCopy(v) {
    const typeOfV = getTypeOf(v)
    if (typeOfV !== 'object' && typeOfV !== 'array') return v;

    let res = typeOfV === 'object' ? {} : []
    for (const key in v) {
        res[key] = v[key]
    }
    return res
}

// 深拷贝  
function old_deepCopy(v) {
    const typeOfV = getTypeOf(v);
    if (typeOfV !== 'object' && typeOfV !== 'array') return v;

    let res = typeOfV === 'object' ? {} : [];

    for (const key in v) {
        res[key] = deepCopy(v[key])
    }

    return res
}

/**
 * 解决以上深拷贝的问题
 * 1. for in 循环不能遍历 non-enumerable 、Symbol 类型的属性，从而无法拷贝这类型的数据
 * 2. 对于非对象、数据的其他引用类型，拷贝的还是地址，并没有实现内存上的隔离
 * 3. 无法实现拷贝对象原型链的继承
 * 4. 无法实现循环引用自身
 */

function deepCopy(v, hash = new WeakMap()) {
    // 如果是基本类型则直接返回
    if (!isObject(v)) return v

    if (v.constructor === Date) return new Date(v)
    if (v.constructor === RegExp) return new RegExp(v)

    // 处理引用类型
    if (hash.has(v)) return hash.get(v);
    let cloneObj = Object.create(Object.getPrototypeOf(v), Object.getOwnPropertyDescriptors(v));
    hash.set(v, cloneObj)
    // 要把子属性为引用类型的递归拷贝
    for (const key of Reflect.ownKeys(v)) {
        if (!isObject(v[key]) || typeof v[key] === 'function') continue;
        console.log(key)
        cloneObj[key] = deepCopy(v[key], hash)
    }

    return cloneObj
}

function isObject(v) {
    return (typeof v === 'object' || typeof v === 'function') && v !== null;
}


// 下面是验证代码
let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: { name: '我是一个对象', id: 1 },
    arr: [0, 1, 2],
    func: function () { console.log('我是一个函数') },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
    enumerable: false, value: '不可枚举属性'
}
);
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepCopy(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)




module.exports = { shallowCopy, deepCopy };


