/**
 * const throttledFn = throttle(func,limit)
 */

function throttle(func, limit) {
    let lastRunTime = null;

    return function (...args) {
        if (!lastRunTime ||
            Date.now() - lastRunTime >= limit) {

            func.apply(this, args)
            lastRunTime = Date.now()
        }
    }
}

function test() {
    console.log('========function excuted!========')
}

const throttledFn = throttle(test, 3000)
const last = Date.now()
const timerId = setInterval(() => {
    console.log('throttle')
    throttledFn()
}, 1000);


if (Date.now() - last > 100000) {
    clearTimeout(timerId)
}