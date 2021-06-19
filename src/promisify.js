// 使用前
fs.readFile('./index.js', (err, data) => {
    if (!err) {
        console.log(data.toString())
    }
    console.log(err)
})
// 使用promisify后
const readFile = promisify(fs.readFile)
readFile('./index.js')
    .then(data => {
        console.log(data.toString())
    })
    .catch(err => {
        console.log('error:', err)
    })


// 将回调函数，转化为promise ， 有效避免 callback hell
function promisify(fn, ctx) {
    if (typeof fn !== 'function') {
        throw new Error('first param must be function!')
    }

    return function promiseFn(...args) {
        return new Promise((resolve, reject) => {

            args.push((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });

            let context = ctx || null
            fn.apply(context, args)
        })
    }
}