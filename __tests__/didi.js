let v1 = Sum(1, 2, 3).valueOf()  //6  
let v2 = Sum(2, 3)(2).valueOf() //7
let v3 = Sum(1)(2)(3)(4).valueOf() //10
let v4 = Sum(2)(3, 1)(4).valueOf()	 //10

console.log(v1, v2, v3, v4)

// 1
function Sum(...args) {
    let res1 = args.reduce((prev, curr) => {
        return prev + curr
    }, 0)

    function fn(...args) {
        res1 = args.reduce((prev, curr) => {
            return prev + curr
        }, res1)

        return fn
    }

    fn.valueOf = function (params) {
        return res1;
    }

    return fn
}


// let lastRequestID = null;

// function fetchWrapper(url, id) {
//     lastRequestID = id;
//     return fetch(url);
// }

// let p1 = fetchWrapper(url, id1)
// let p2 = fetchWrapper(url, id2)
// let p3 = fetchWrapper(url, id3)

// p1.then(resloveCallback)
// p2.then(resloveCallback)
// p3.then(resloveCallback)

// function resloveCallback(res) {
//     let requestID = res.requestID;
//     if (requestID == lastRequestID) {
//         // do next task
//     }
// }