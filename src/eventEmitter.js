class EventEmitter {
    constructor() {
        this._events = {}
    }

    static VERSION = '1.0.0';

    on(eventName, listener) {
        if (!eventName || !listener) return;

        if (typeof listener !== 'function') {
            throw new TypeError('listener must be a function')
        }


        if (!this._events[eventName]) {
            this._events[eventName] = [callback]
        } else {
            this._events.push(callback)
        }
    }

    emmit(eventName, ...args) {

        if (!this._events[eventName]) return

        this._events[eventName].forEach(callback => {
            callback.apple(this, args)
        })
    }

    off(eventName, listener) {
        if (!this._events[eventName]) return

        this._events[eventName] = this._events[eventName].filter(item => item !== listener)
    }
}