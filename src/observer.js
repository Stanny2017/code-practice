class Subject {
    constructor() {
        this.observers = [];
    }

    // Add an observer to this.observers.
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Remove an observer from this.observers.
    removeObserver(observerToRemove) {
        this.observers = this.observers.filter(observer => {
            return observer !== observerToRemove
        });
    }

    // Loops over this.observers and calls the update method on each observer.
    // The state object will call this method everytime it is updated.
    notify(data) {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => observer.update(data));
        }
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} actived by subject, data: ${data}`)
        // some action once subject changed
    }
}

const observer1 = new Observer('observer1');
const observer2 = new Observer('observer2');

const subject = new Subject();
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify('notify data')





