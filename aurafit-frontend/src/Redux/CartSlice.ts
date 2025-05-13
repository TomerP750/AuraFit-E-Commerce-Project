import {createSlice} from "@reduxjs/toolkit";
import {Cart} from "../Models/Cart.ts";


export interface CartState {
    cart: Cart | null;
    itemCount: number;
}

const initialState: CartState = {cart: null, itemCount: 0};


const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {

    }
})

export default cartSlice.reducer;