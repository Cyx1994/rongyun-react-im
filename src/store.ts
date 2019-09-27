import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';

import AuthReducer from './reducers/auth';
import ChatReducer from './reducers/chat';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: AuthReducer,
    chat: ChatReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let Store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(Store)


export { Store, persistor };