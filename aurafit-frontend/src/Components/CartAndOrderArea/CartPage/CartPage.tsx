import "./CartPage.css";
import {JSX, useState} from "react";
import {Cart} from "../../../Models/Cart.ts";
import {CartItemCard} from "../CartItemCard/CartItemCard.tsx";
import {useNavigate} from "react-router-dom";
import {BiCart} from "react-icons/bi";

export function CartPage(): JSX.Element {

    const navigate = useNavigate();

    const dummyProducts = [
        {
            name: "cartItem one",
            basePrice: 200,
            color: "black",
            size: "L",
        },
    ]

    const [cart, setCart] = useState<Cart>();


    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center bg-white font-medium pb-10">
            <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row w-4/5 gap-10 mt-20">
                {/* Left Section: Cart Items */}
                <div className="flex flex-col w-full lg:w-2/3 gap-10">
                    <div className="flex gap-3 items-center text-3xl">
                        <BiCart />
                        <p>Cart</p>
                    </div>
                    {dummyProducts.length > 0 ? (
                        dummyProducts.map((item, index) => (
                            <CartItemCard
                                key={index}
                                basePrice={item.basePrice}
                                size={item.size}
                                name={item.name}
                                color={item.color}
                            />
                        ))
                    ) : (
                        <span>Your Cart is empty</span>
                    )}
                </div>

                {/* Right Section: Order Summary */}
                <div className="flex flex-col items-start bg-gray-100/40 px-6 sm:px-10 w-full lg:w-1/3 gap-8 py-8 rounded-md">
                    <p className="font-medium text-xl">Order Summary</p>
                    <div className="flex justify-between w-full">
                        <span className="font-light">Subtotal</span>
                        <span>$15</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="font-light">Shipping & Handling</span>
                        <span>$15</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="font-light">Tax</span>
                        <span>$15</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Total</span>
                        <span className="font-medium">$15</span>
                    </div>

                    <button
                        disabled={dummyProducts.length === 0}
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
