function lastPromise(promiseFunction) {
    let curPro;
   
    return function () {
        return new Promise((resolve, reject) => {
            const myPro = promiseFunction();

            curPro = myPro;

            myPro.then((data) => {
                if (curPro === myPro) {
                    resolve(data);
                }
            });
        });
    };
}
