// root-reducer.js

import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice.js';
import flightDetailsReducer from '../slice/flightDetailsSlice.js';
import profileSlice from "../slice/profileSlice.js";

const rootReducer = combineReducers({
    auth: authReducer,
    flightDetails: flightDetailsReducer,
    profile: profileSlice
});

export default rootReducer;
