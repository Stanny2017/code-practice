// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 输入:
// nums1 = [1,2,3,0,0,0]； m = 3
// nums2 = [2,5,6]；       n = 3
// 输出: [1,2,2,3,5,6]

function mergeToFirstParam(num1, num2) {
    let p1 = 0;
    let p2 = 0;
    while (p1 < num1.length && p2 < num2.length) {
        if (num2[p2] < num1[p1]) {
            num1.splice(p1, 0, num2[p2])
            p2++;
            p1++;
        } else {
            p1++;
        }
    }

    // concat 并不改变原数组
    // return num1.concat(num2.slice(p2))
    return num1.push(num2.slice(p2))
}

const result = mergeToFirstParam([1, 2, 10], [-1])
console.log(result)