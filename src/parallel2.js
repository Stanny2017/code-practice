async function parallel(input, max) {
    if (!input.length) return [];

    if (input.length <= max) {
        let promises = []
        for (let i = 0; i < max; i++) {
            promises.push(fetch(input[i]));
        }

        let res = await Promise.all(promises)
        // console.log(res)
        return res
    }

    let successCount = 0;
    let i = 0;
    let output = [];

    return new Promise(resolve => {
        const onResolved = (res, outputIndex) => {
            output[outputIndex] = res;
            successCount++;

            if (successCount >= input.length) {
                resolve(output);
                console.log(output)
            } else if (max + i < input.length) {
                let idx = i;
                fetch(input[max + idx]).then(res => onResolved(res, max + idx))
                i++;
            }
        }

        for (let i = 0; i < max; i++) {
            fetch(input[i]).then(res => onResolved(res, i))
        }
    })


    // return new Promise((resolve, reject) => {
    //     let url1 = input[0]
    //     let url2 = input[1]

    //     let i = 1;
    //     let successCount = 0;
    //     let output = [];

    //     const callback = (res, index) => {
    //         i++;
    //         successCount++;
    //         output[index] = res;

    //         if (successCount >= input.length) {
    //             resolve(output);
    //             console.log(output)
    //         } else if (i < input.length) {
    //             let idx = i;
    //             fetch(input[idx], res => callback(res, idx))
    //         }
    //     }

    //     fetch(url1, res => callback(res, 0))
    //     fetch(url2, res => callback(res, 1))
    // })
}

function fetch(url) {
    console.log('fetch url:', url)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${url} data`)
        }, 1000)
    })
}


async function parallelRequest(input, maxWorkers) {
    let output = [];
    let successCount = 0;
    let moreThanMaxIndex = 0;

    const process = async i => {
        let res = await fetch(input[i]);

        output[i] = res;
        successCount++;

        let nextIndex = maxWorkers + moreThanMaxIndex
        if (nextIndex < input.length) {
            process(nextIndex);
            moreThanMaxIndex++;
        }

        if (successCount >= input.length) {
            console.log(output)
            return output;
        }
    }

    for (let i = 0; i < maxWorkers; i++) {
        if (i > input.length - 1) break;
        process(i)
    }
}


parallelRequest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)