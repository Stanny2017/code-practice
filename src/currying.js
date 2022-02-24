function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            func.apply(this, args);
        } else {
            return function (...args1) {
                return curried.apply(this, args.concat(args1))
            }
        }
    }
}