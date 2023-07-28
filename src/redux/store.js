// import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import reducers from './reducers/index';


// const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export const dispatch = store.dispatch;
// export default store;


// react-redux bilan qilingan
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/index';
import kadrlar from './reducers/kadr';

const store = configureStore({
    reducer: {
        user: reducers,
        kadr: kadrlar,
    }
});
export default store;
export const dispatch = store.dispatch;