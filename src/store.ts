import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { AuthReducer } from './modules/SignModule';
import { ChatReducer } from './modules/ChatModule';


const rootReducer = combineReducers({
    auth: AuthReducer,
    chat: ChatReducer,
})
let middleware: any[] = [thunk];

if (process.env.NODE_ENV === 'development') {
    // 开发环境中间件
    middleware = [
        ...middleware,
        logger,
    ]
}

let Store = createStore(rootReducer, applyMiddleware(...middleware));

export { Store };