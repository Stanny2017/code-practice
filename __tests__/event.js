class event {
    constructor() {
        this._events = {};
    }

    on(type, callback) {
        if (this._events[type]) {
            this._events[type].push(callback);
        } else {
            this._events[type] = [];
        }
    }

    off(type, callback) {
        if (!this._events[type]) return;

        this._events[type] = this._events[type].filter(cb => cb !== callback)
    }

    emit(type) {
        if (!this._events[type]) return;

        this._events[type].forEach(callback => {
            callback();
        });
    }
}