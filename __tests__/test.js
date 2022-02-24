var longestValidParentheses = function (s) {
    let stack = [-1];
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        let c = s[i]

        if (c == '(') {
            stack.push(i)
        } else {
            // ')'
            stack.pop();

            if (stack.length) {
                let currentMax = i - stack[stack.length - 1];
                max = Math.max(currentMax, max)
            } else {
                stack.push(i)
            }
        }
    }

    return max
};

console.log(longestValidParentheses('()(()'))



const lastPromiseFn = (promiseCreator) => {
    let count = 0

    return function lastPromise(...args) {
        return new Promise((resolve, reject) => {
            count++
            const last = count

            const handleStateChange = (res, resolveOrReject) => {
                if (last === count) {
                    resolveOrReject(res)
                }
            }

            promiseCreator(...args)
                .then(data => {
                    handleStateChange(data, resolve)
                })
                .catch(err => {
                    handleStateChange(err, reject)
                })
        })
    }
}

