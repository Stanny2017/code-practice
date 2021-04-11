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