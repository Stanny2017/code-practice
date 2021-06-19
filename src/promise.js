/**
 * implement Promise/A+
 *
 * 1. thenable:  promise.then(onFulfilled, onRejected)
 * 2. A promise must be in one of three states: pending, fulfilled, or rejected.
 * 3. 链式调用
 *
 */

// new Promise((resolve,reject)=>{})

class Promise {
    constructor(excutor) {
        this.status = 'pending'
        this.resolveData = undefined;
        this.rejectReason = undefined;
        this.onFulfilledCallBack = [];
        this.onRejectedCallBack = [];

        const resolve = value => {
            setTimeout(() => {
                // 防止重复调用 resolve/reject  状态一旦改变 不可更改
                if (this.status !== 'pending') return

                this.status = 'fulfilled';
                this.resolveData = value;
                this.onFulfilledCallBack.forEach(onFulfilled => onFulfilled())
            }, 0)
        }

        const reject = reason => {
            setTimeout(() => {
                if (this.status !== 'pending') return

                this.status = 'rejected';
                this.rejectReason = reason;
                this.onRejectedCallBack.forEach(onRejected => onRejected())
            }, 0)
        }

        try {
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) { }
        onRejected = typeof onRejected === 'function' ? onRejected : function (r) { }

        var promiseToReturn;
        if (this.status === 'fulfilled') {
            promiseToReturn = new Promise((resolve, reject) => {
                try {
                    let x = onFulfilled(this.resolveData)
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }

        if (this.status === 'rejected') {
            promiseToReturn = new Promise((resolve, reject) => {
                try {
                    let x = onRejected(this.rejectReason);
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }

        if (this.status === 'pending') {
            promiseToReturn = new Promise((resolve, reject) => {
                this.onFulfilledCallBack.push(() => {
                    try {
                        let x = onFulfilled(this.resolveData);

                        if (x instanceof Promise) {
                            x.then(resolve, reject)// 会进到返回的 promise 实例的 then 方法中，
                        } else {
                            resolve(x)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })

                this.onRejectedCallBack.push(() => {
                    try {
                        let x = onRejected(this.rejectReason)
                        if (x instanceof Promise) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        return promiseToReturn
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    static all(promises) {
        if (!Array.isArray(promises)) {
            throw new Error('params must be array')
        }

        let successCount = 0;
        let resultArr = [];

        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let promise = promises[i];
                if (!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise);
                }

                promise.then((data) => {
                    resultArr[i] = data;
                    successCount++;

                    if (successCount === promises.length) {
                        resolve(resultArr)
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let promise of promises) {
                if (!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise);
                }
                promise.then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            }
        })
    }
}


