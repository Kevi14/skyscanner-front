// root-reducer.js

import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice.js';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
