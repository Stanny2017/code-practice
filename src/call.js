Function.prototype._call = function (context, ...args) {
    context = context || window
    context.fn = this
    let res = context.fn(...args)
    delete context.fn
    return res
}


function testFn() {
    this.name = '';
}

var obj = {};
var obj2 = { age: 29, testFn }
obj2.testFn._call(obj, testFn)
console.log(obj, obj2)
