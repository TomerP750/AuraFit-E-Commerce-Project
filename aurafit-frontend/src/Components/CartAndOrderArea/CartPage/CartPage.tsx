import "./CartPage.css";
import {JSX, useContext, useEffect, useState} from "react";
import {CartItemCard} from "../CartItemCard/CartItemCard.tsx";
import {useNavigate} from "react-router-dom";
import {BiCart} from "react-icons/bi";
import cartService from "../../../Services/CartService.ts";
import {useCartSelector, useUserSelector} from "../../../Redux/hooks.ts";
import {toast} from "react-toastify";
import {CartDTO} from "../../../Models/DTOS/CartDTO.ts";
import {AddToCartRequestDTO} from "../../../Models/DTOS/AddToCartRequestDTO.ts";
import {store} from "../../../Redux/store.ts";
import {Cart} from "../../../Models/Cart.ts";
import {decrement, increment, saveCart, updateCounter} from "../../../Redux/CartSlice.ts";
import {useDispatch} from "react-redux";

export function CartPage(): JSX.Element {
    const dispatch = useDispatch();


    const navigate = useNavigate();

    const user = useUserSelector(state => state.authSlice.user);
    // const cart = useCartSelector(state => state.cartSlice.cart);

    const [cart, setCart] = useState<Cart | null>(store.getState().cartSlice.cart);

    useEffect(() => {

        const loader = user ? cartService.getUserCart() : cartService.getGuestCart()

        loader.then(res => {
            setCart(res)
        })
            .catch(err => toast.error(err));


    },[user])

    if (!cart) {
        return <span>Loading...</span>;
    }


    function handleDeleteCartItem(id: number) {

        const answer = window.confirm("Are you sure you want to remove this item from the cart?");
        const cartItem = cart!.items.find(item => item.id === id);
        if (answer) {
            cartService.removeItemFromCart(id)
                .then(res => {
                    dispatch(updateCounter(cartItem!.quantity));
                    setCart(res)
                    cart!.items.filter(item => item.id !== id)
                })
                .catch(err => toast.error(err));
        }
    }

    function handleRemoveOneQuantity(cartItemId: number) {
        if (!cart) return;
        const cartItem = cart.items.find(item => item.id === cartItemId);
        if (!cartItem) return;

        if (cartItem.quantity > 1) {
            // Just decrement
            cartService.removeOneQuantityFromCartItem(cartItemId)
                .then(updatedCart => {
                    setCart(updatedCart);
                    dispatch(decrement())
                })
                .catch(err => toast.error(err));
        } else {
            // Last one → confirm full removal
            const ok = window.confirm("This is the last one — remove the item?");
            if (!ok) return;

            cartService.removeOneQuantityFromCartItem(cartItemId)
                .then(updatedCart => {
                    setCart(updatedCart);
                    dispatch(updateCounter(cartItem.quantity));
                    toast.success("Item removed");
                })
                .catch(err => toast.error(err));
        }
    }


    function handleAddToCart(variantId: number) {
        const dto = new AddToCartRequestDTO(variantId, 1);

        cartService.addToCart(dto)
            .then(res => {
                dispatch(increment())
                setCart(res)
            })
            .catch(err => toast.error(err));
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center bg-white font-medium pb-10">
            <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row w-4/5 gap-10 mt-20">
                {/* Left Section: Cart Items */}
                <div className="flex flex-col w-full lg:w-2/3 gap-10">
                    <div className="flex gap-3 items-center text-3xl">
                        <BiCart />
                        <p>Cart</p>
                    </div>
                    {cart.items.length > 0 ? cart.items.map(ci => <CartItemCard
                        page={"cartPage"}
                        onOneQuantityRemove={()=>handleRemoveOneQuantity(ci.id)}
                        onAddToCart={()=>handleAddToCart(ci.variant.id)}
                        onDelete={()=>handleDeleteCartItem(ci.id)}
                        cartItem={ci} key={ci.id} />) : <p className={"text-2xl"}>Your cart is empty</p>}
                </div>

                {/* Right Section: Order Summary */}
                <div className="flex flex-col items-start bg-gray-100/40 px-6 sm:px-10 w-full lg:w-1/3 gap-8 py-8 rounded-md">
                    <p className="font-medium text-xl">Order Summary</p>
                    <div className="flex justify-between w-full">
                        <span className="font-light">Subtotal</span>
                        <span>${cart.subTotal}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="font-light">Shipping & Handling</span>
                        {cart.shippingCost === 0 ? <span>Free Shipping</span> : <span>${cart.shippingCost}</span>}
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Total</span>
                        <span className="font-medium">${cart.totalCartPrice}</span>
                    </div>

                    <button
                        disabled={cart.items.length === 0}
                        onClick={() => navigate("/checkout")}
                        className="cursor-pointer disabled:bg-black/30 bg-[#1a1a1a] hover:bg-black text-white w-full py-4 self-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
