import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./alertsSlice.js";
import {userSlice} from "./userSlice.js";

const rootReducer = combineReducers({
    alerts: alertSlice.reducer,
    user:userSlice.reducer
    });

const store = configureStore({
    reducer:rootReducer,
})

export default store;