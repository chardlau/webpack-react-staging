import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import { createLogger } from 'redux-logger';

import DevTools from '../DevTools'; // 辅助工具

import reducers, { initialState } from './reducers';

let enhancer = applyMiddleware(thunk);
if (process.env.NODE_ENV === 'development') {
    enhancer = compose(
        applyMiddleware(thunk, createLogger()),
        DevTools.instrument()
    )
}

let store = createStore(
    reducers,
    initialState,
    enhancer
);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }
}

export default store;
