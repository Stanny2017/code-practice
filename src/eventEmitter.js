function isValidListener(listener) {
    if (typeof listener === 'function') return true;

    if (typeof listener === 'object' &&
        typeof (listener.listener) === 'function'
    ) {
        return true;
    } else {
        return false
    }
}

function getListenerFn(l) {
    return typeof l === 'function' ? l : l.listener;
}

function isRepeat(listeners, l) {
    const listener = getListenerFn(l)

    for (let item of listeners) {
        if (item.listener === listener) return true;
    }

    return false;
}

const EVENTS = Symbol('events');

class EventEmitter {
    constructor() {
        this[EVENTS] = {}
    }

    static VERSION = '1.0.1';

    addListener(eventName, listener) {
        if (!eventName || !listener) return;

        if (!isValidListener(listener)) {
            throw new TypeError('invalid listener')
        }

        let listeners = this[EVENTS][eventName]
        if (!this[EVENTS][eventName]) {
            listeners = this[EVENTS][eventName] = [];
        }

        if (isRepeat(listeners, listener)) return;

        listeners.push({
            listener: getListenerFn(listener),
            once: listener.once ? true : false,
        })

    }

    on(eventName, l) {
        this.addListener(eventName, l)
    }

    emmit(eventName, ...args) {
        if (!this[EVENTS][eventName]) return;
        const toOff = [];

        this[EVENTS][eventName].forEach(({ listener, once }) => {
            listener.apply(this, args)
            if (once) {
                // 移除
                toOff.push(listener)
            }
        })

        if (toOff.length > 0) {
            toOff.forEach(listener => {
                this.off(eventName, listener)
            })
        }
    }

    off(eventName, listener) {
        if (!this[EVENTS][eventName]) return;

        this[EVENTS][eventName] = this[EVENTS][eventName].filter(({ listener: item }) => item !== listener)
    }

    allOff(eventName) {
        this[EVENTS][eventName] = []
    }

    once(eventName, listener) {
        this.addListener(eventName, {
            listener: getListenerFn(listener),
            once: true
        })
    }
}

// eventEmmiter 优化
/**
 * - [x] addListener() 第二个参数优化，可以是对象类型 包含 listener key值为参数
 * - [x] 优化内部变量，对外不可访问
 * - [x] 不可重复添加事件
 * - [x] 实现 once
 */


const emmiter = new EventEmitter()

emmiter.on('say', function (name) {
    console.log('hello1' + name)
})


emmiter.on('say', function (name) {
    console.log('hello2' + name)
})

emmiter.once('say', function (name) {
    console.log('only exute once')
})

emmiter.emmit('say', 'fuck')
emmiter.emmit('say', 'fuck')