import { createContext } from "react";

type CartState = {
    cartItemsCounter: number;
}

type CartContextValue = CartState & {
    increment: () => void;
    decrement: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);


type CartContextProviderProps = {
    children: React.ReactNode;
}
export default function CartContextProvider({children}: CartContextProviderProps) {

    const ctx: CartContextValue = {
        cartItemsCounter: 0,
        increment: ()=>{

        },
        decrement: ()=>{

        },
    }
    return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>
}