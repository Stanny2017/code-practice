function deepCopy(v) {
    // 如果是基本类型则直接返回
    if (!isObject(v)) return v

    // 处理引用类型
    let cloneObj = Object.create(Object.getPrototypeOf(v), Object.getOwnPropertyDescriptors(v));

    // 要把子属性为引用类型的递归拷贝
    for (const key of Reflect.ownKeys(v)) {
        if (!isObject(v[key]) && typeof v !== 'function') continue;
        console.log(key)
        cloneObj[key] = deepCopy(v[key])
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
    // date: new Date(0),
    // reg: new RegExp('/我是一个正则/ig'),
    // math: Math,
    [Symbol('1')]: 1,
};
// Object.defineProperty(obj, 'innumerable', {
//     enumerable: false, value: '不可枚举属性'
// }
// );
// obj = Object.create({test:'proto'}, Object.getOwnPropertyDescriptors(obj))
// obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepCopy(obj)
cloneObj.arr.push(4)

console.log('obj', obj)
console.log('Reflect.keys', Reflect.ownKeys(obj))
console.log('cloneObj', cloneObj)

