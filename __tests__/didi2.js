// ‘goo4 comp1ny alway3 d2 thing5 righ6’

function resSortWords(str) {
    let strArr = str.split(' ');

    strArr.sort((str1, str2) => {
        let n1 = str1.match(/\d+/)[0];
        let n2 = str2.match(/\d+/)[0];

        return n1 - n2;

    })

    return strArr.join(' ')
}

console.log(resSortWords('goo4 comp1ny alway3 d2 thing5 righ6'))

