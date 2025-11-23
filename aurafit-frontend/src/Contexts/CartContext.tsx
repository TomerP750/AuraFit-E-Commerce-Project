// contexts/CartContext.tsx
import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
import {CartDTO} from "../Models/DTOS/CartDTO.ts";
import cartService from "../Services/CartService.ts";


type CartContextValue = {
    cart: CartDTO | null;
    cartItemsCounter: number;
    refreshCart: () => Promise<void>;
    increment: () => void;
    decrement: () => void;
    clean: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("CartContext must be used inside CartProvider");
    return ctx;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({children,}) => {
    const [cart, setCart] = useState<CartDTO | null>(null);
    const [counter, setCounter] = useState(0);

    
    const refreshCart = useCallback(async () => {
        try {
            const data = await cartService.getUserCart(); 
            setCart(data);
            
            const sum = data.items.reduce((acc, item) => acc + item.quantity, 0);
            setCounter(sum);
            
            localStorage.setItem("counter", JSON.stringify(sum));
        } catch (err) {
            console.error("Failed to load cart:", err);
        }
    }, []);

    // on mount (or on login), fetch initial cart
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const increment = useCallback(() => {
        setCounter((prev) => prev + 1);
    }, []);

    const decrement = useCallback(() => {
        setCounter((prev) => Math.max(0, prev - 1));
    }, []);

    const clean = useCallback(() => {
        setCart(null);
        setCounter(0);
        localStorage.removeItem("counter");
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                cartItemsCounter: counter,
                refreshCart,
                increment,
                decrement,
                clean,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
