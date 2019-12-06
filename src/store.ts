import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import { AuthReducer } from './modules/SignModule';
import { ChatReducer } from './modules/ChatModule';


const rootReducer = combineReducers({
    auth: AuthReducer,
    chat: ChatReducer,
})

let Store = createStore(rootReducer, applyMiddleware(thunk));

export { Store };