/**
 * 使用方法
 * const debouncedFn = debounce(fn,timeout)
 */

function debounce(func, wait, immeditate) {
    let timerId = null;

    return function (...args) {
        if (immeditate && !timerId) {
            func.apply(this, args)
        }

        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}


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



function debounce(fn, delayTime) {
    let timerId = null;

    return function (...args) {
        if (timerId) clearTimeout(timerId)

        timerId = setTimeout(() => {
            fn.apply(this, args)
        }, delayTime);
    }
}


function throttle(fn, timeLimit) {
    let waitting = false;

    return function (...args) {
        if (!waitting) {
            fn.apply(this, args);
            waitting = true;

            setTimeout(() => {
                waitting = false;
            }, timeLimit)
        }
    }
}



