import { combineReducers } from "redux";
import Login from "./Login";
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ["Login"],
};

const rootReducer = combineReducers({
    Login
});

export default persistReducer(persistConfig, rootReducer);