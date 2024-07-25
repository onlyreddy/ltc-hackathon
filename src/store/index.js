// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    // devTools: composeWithDevTools(),
});
