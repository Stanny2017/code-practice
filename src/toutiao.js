var thousandSeparator = function (n) {
    let reverseStrArr = n.toString().split('').reverse();
    let result = [];

    for (let i = 0; i < reverseStrArr.length; i++) {
        result.push(reverseStrArr[i]);
        let len = i + 1;
        if (len % 3 == 0 && i !== reverseStrArr.length - 1 && i !== 0) {
            result.push(',');
        }
    }

    return result.reverse().join('');
};

console.log(thousandSeparator('123456984333ffsfafew43524344357'))