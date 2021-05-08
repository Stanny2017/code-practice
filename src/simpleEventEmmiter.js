class EventEmmiter {
    constructor() {
        this._events = {};
    }

    on(eventName, listener) {
        if (this._events[eventName]) {
            this._events[eventName].push(listener)
        } else {
            this._events[eventName] = []
        }
    }

    emmit(eventName, ...args) {
        this._events[eventName].forEach(l => {
            l.apply(this, args)
        })
    }

    off(eventName, listenerToRemove) {
        if (!this._events[eventName]) return;

        this._events[eventName] = this._events[eventName].filter(l => l !== listenerToRemove)

    }
}