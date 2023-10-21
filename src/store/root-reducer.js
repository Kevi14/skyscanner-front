// root-reducer.js

import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice.js';
import flightDetailsReducer from '../slice/flightDetailsSlice.js';

const rootReducer = combineReducers({
    auth: authReducer,
    flightDetails: flightDetailsReducer,
});

export default rootReducer;
