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
function deepCopy(v) {
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
module.exports = { shallowCopy, deepCopy };


// ========教程中的写法==========
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
    if (obj.constructor === Date)
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
    if (obj.constructor === RegExp)
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
    //如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    //继承原型链
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
}

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

let cloneObj = deepClone(obj);

obj.date.a = 'test'

console.log(cloneObj)
