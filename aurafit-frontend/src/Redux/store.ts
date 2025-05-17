import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./AuthSlice.ts";
// import {cartSlice} from "./CartSlice.ts";


export const store = configureStore({
    reducer: { authSlice: authReducer,  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
