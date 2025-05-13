import "./CheckoutPage.css";
import {JSX, useEffect, useState} from "react";
import {CheckoutForm} from "../CheckoutForm/CheckoutForm.tsx";
import {CheckoutRequestDTO} from "../../../Models/DTOS/CheckoutRequestDTO.ts";
import orderService from "../../../Services/OrderService.ts";
import {toast} from "react-toastify";
import {CartDTO} from "../../../Models/DTOS/CartDTO.ts";
import cartService from "../../../Services/CartService.ts";
import {OrderItemCard} from "../OrderItemCard/OrderItemCard.tsx";

export function CheckoutPage(): JSX.Element {

    const [cart, setCart] = useState<CartDTO>();

    useEffect(() => {
        cartService.getUserCart()
            .then(res => setCart(res))
            .catch(err => toast.error(err.response.data));
    }, [])

    function placeOrder(data: CheckoutRequestDTO) {
        orderService.placeOrder(data)
            .then(res => toast.success("Order Placed, Thanks for shopping!"))
            .catch((err) => toast.error(err.response.data))
    }

    if (!cart) {
        return <span></span>
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center bg-white py-12">
            <div className="w-9/10 flex justify-center items-center gap-5">
                {/* --------- Left Section --------- */}
                <div className="w-2/3">
                    <CheckoutForm onSubmit={placeOrder}/>
                </div>

                {/* --------- Right Section --------- */}
                <aside className="w-1/2 bg-neutral-200 text-black p-6 rounded-lg flex flex-col justify-between h-full">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4 text-base">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cart.subTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                {cart.shippingCost === 0 ? <span>Free Shipping</span> : <span>cart.shippingCost</span>}
                            </div>
                            <div
                                className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-700">
                                <span>Total</span>
                                <span>${cart.totalCartPrice}</span>
                            </div>
                            <div className="w-full flex flex-col gap-4">
                                {cart.items.map(ci => <OrderItemCard key={ci.id} cartItem={ci}/>)}
                            </div>
                        </div>
                    </div>

                    <button
                        form="checkoutForm"
                        type="submit"
                        className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded w-full transition"
                    >
                        Place Order
                    </button>
                </aside>
            </div>
        </div>
    );
}
