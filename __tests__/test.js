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
