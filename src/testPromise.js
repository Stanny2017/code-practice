const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('data')
    }, 1000);
})

p.then(() => {
    console.log('then1 data')
})

p.then(() => {
    console.log('then2 data')
})