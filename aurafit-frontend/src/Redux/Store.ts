import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice.ts";


export const Store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
    }
});