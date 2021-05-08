try {
    setTimeout(() => {
        someFunction()
    }, 0)
} catch (e) {
    // err-handle
}

setTimeout(() => {
    errCatchWrapper(someFunction);
}, 0)

function errCatchWrapper(callback) {
    try {
        callback()
    } catch (e) {
        // error handle logic
    }
}

function someFunction() {
    // Reference error
    c = aa + b
}

