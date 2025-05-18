import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./AuthSlice.ts";
import {cartReducer} from "./CartSlice.ts";
// import {cartSlice} from "./CartSlice.ts";


export const store = configureStore({
    reducer: { authSlice: authReducer, cartSlice: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
