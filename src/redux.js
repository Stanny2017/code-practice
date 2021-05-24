// createStore.js
function createStore(reducer, preloadedState, enhancer) {
    let currentState = preloadedState;
    let isDispatching = false;
    let currentListeners = []

    if (enhancer !== 'undefined') {
        // enhancer 也可以作为第二个参数传递

        // enhancer 的作用就是增强 createStore
        return enhancer(createStore)(reducer, preloadedState)
    }

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        if (typeof listeners !== 'function') {
            throw new Error('listener must be function')
        }
        // 省略一些校验

        currentListeners.push(listener);

        return function unsubscribe(listenerToRemove) {
            const index = currentListeners.indexOf(listenerToRemove)
            currentListeners.splice(index, 1)
        }
    }

    function dispatch(action) {
        // action 校验

        if (isDispatching) {
            throw new Error('禁止套娃');
        }

        try {
            isDispatching = true;
            // 调用 reducer 来触发修改 state
            currentState = reducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        // 触发订阅
        let listeners = (currentListeners = nextListeners);
        listeners.forEach(fn => {
            fn();
        });
    }

    return {
        dispatch,
        subscribe,
        getState,
        // replaceReducer,
    }
}

// applyMiddleware.js

function applyMiddleware(...middlewares) {

    return function enhancer(createStore) {
        return function (reducer, preloadedState) {

            let store = createStore(reducer, preloadedState)

            let dispatch = () => {
                throw new Error('not allowed in middleware runtime')
            }

            let chain = middlewares.map(middleware => middleware({
                getState: store.getState,
                dispatch,
            }))

            dispatch = compose(...chain)(store.dispatch)

            return {
                ...store,
                dispatch// 改写后的 dispatch
            }

        }
    }
}

function compose(...funcs) {

    if (funcs.length == 0) {
        return args => args;
    }

    if (funcs.length == 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}