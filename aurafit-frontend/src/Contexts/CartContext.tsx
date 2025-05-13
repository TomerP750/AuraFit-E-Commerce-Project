import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import cartService from "../Services/CartService";
import { CartDTO } from "../Models/DTOS/CartDTO";

// shape of what we share
interface CartContextValue {
    cart: CartDTO | null;
    reloadCart: () => Promise<void>;
    itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartDTO | null>(null);

    // fetch (or re-fetch) cart from server/guest on mount & when needed
    const reloadCart = async () => {
        try {
            const fresh = await cartService.getUserCart();
            setCart(fresh);
        } catch {
            // fallback to guest
            const guest = await cartService.getGuestCart();
            setCart(guest);
        }
    };

    useEffect(() => {
        reloadCart();
    }, []);

    const itemCount = cart ? cart.items.reduce((sum, i) => sum + i.quantity, 0) : 0;

    return (
        <CartContext.Provider value={{ cart, reloadCart, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

// custom hook for easy consumption
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
}
