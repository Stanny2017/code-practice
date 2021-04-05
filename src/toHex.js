/**
 * 十进制转换为16进制
 * 
 * e.g. 21ab = 16^0 * 11 +  16^1 * 10 + 16^2 * 1 + 16^3 * 2
 *
 * a~f --> 10-15
 */

function toHex(value) {
    let help = '0123456789abcdef'
    let res = ''

    let temp = value
    while (temp > 0) {
        res = help[temp % 16] + res
        temp = Math.floor(temp / 16)
    }
    return res
}