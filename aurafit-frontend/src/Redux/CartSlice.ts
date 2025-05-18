// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../Models/Cart";

// Helpers to load from localStorage
function loadCart(): Cart | null {
    const json = localStorage.getItem("cart");
    if (!json) return null;
    try {
        return JSON.parse(json) as Cart;
    } catch {
        console.warn("Failed to parse cart from localStorage");
        return null;
    }
}

function loadCounter(): number {
    const json = localStorage.getItem("counter");
    if (!json) return 0;
    const n = parseInt(json, 10);
    return isNaN(n) ? 0 : n;
}

// Initial state pulled from localStorage (or defaults)
export type CartState = {
    cart: Cart | null;
    counter: number;
};

const initialState: CartState = {
    cart: loadCart(),
    counter: loadCounter(),
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clean(state) {
            state.cart = null;
            state.counter = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("counter");
        },
        saveCart(state, action: PayloadAction<Cart>) {
            state.cart = action.payload;
            state.counter = action.payload.items.length;
            // persist
            localStorage.setItem("cart", JSON.stringify(action.payload));
            localStorage.setItem("counter", JSON.stringify(state.counter));
        },
        increment(state) {
            state.counter++;
            localStorage.setItem("counter", JSON.stringify(state.counter));
        },
        decrement(state) {
            state.counter = Math.max(0, state.counter - 1);
            localStorage.setItem("counter", JSON.stringify(state.counter));
        },
    },
});

export const { clean, saveCart, increment, decrement } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
