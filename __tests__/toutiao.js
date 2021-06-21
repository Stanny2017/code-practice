class Scheduler {
    constructor() {
        this.maxWorkers = 2;
        this.queue = [];
        this.count = 0;

    }

    add(promiseCreator) {
        // todo
        this.count++;

        return new Promise(resolve => {
            if (this.count <= this.maxWorkers) {

                const onResolved = (resolve) => {
                    resolve();
                    if (this.queue.length > 0) {
                        let task = this.queue.shift();
                        let [promiseFn,resolveFn] = task;
                        promiseFn().then(()=>onResolved(resolveFn));
                    }
                }

                promiseCreator().then(()=>onResolved(resolve));
            } else {
                this.queue.push([promiseCreator,resolve]);
            }
        })
    }
}

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler
        .add(() => timeout(time))
        .then(() => console.log(order));
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')