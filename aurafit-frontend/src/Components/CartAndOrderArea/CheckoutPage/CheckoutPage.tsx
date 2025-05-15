import "./CheckoutPage.css";
import {JSX, useEffect, useState} from "react";
import {CheckoutForm} from "../CheckoutForm/CheckoutForm.tsx";
import {CheckoutRequestDTO} from "../../../Models/DTOS/CheckoutRequestDTO.ts";
import orderService from "../../../Services/OrderService.ts";
import {toast} from "react-toastify";
import {CartDTO} from "../../../Models/DTOS/CartDTO.ts";
import cartService from "../../../Services/CartService.ts";
import {OrderItemCard} from "../OrderItemCard/OrderItemCard.tsx";
import {useUserSelector} from "../../../Redux/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import {ContactInformation} from "../../../Models/ContactInformation.ts";
import {CartItemCard} from "../CartItemCard/CartItemCard.tsx";

export function CheckoutPage(): JSX.Element {

    const [cart, setCart] = useState<CartDTO>();
    const user = useUserSelector(state => state.authSlice.user);
    const navigate = useNavigate();

    useEffect(() => {
        cartService.getUserCart()
            .then(res => setCart(res))
            .catch(err => toast.error(err.response.data));
    }, [])

    function placeOrder(data: ContactInformation) {
        if (user) {
            orderService.checkoutUser(data)
                .then(res => {
                    navigate("/order/success", { state: {order: res} });
                    toast.success("Order Placed, Thanks for shopping!");
                })
                .catch((err) => toast.error(err.response.data))
        }
    }

    if (!cart) {
        return <span></span>
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center bg-white py-12">
            <div className="w-4/5 flex justify-center items-center gap-10">
                {/* --------- Left Section --------- */}
                <div className="w-2/3 flex flex-col items-start gap-8">
                    <NavLink className={"flex gap-1 items-center hover:underline"} to={"/cart"}><FiArrowLeft/> Back to cart</NavLink>
                    <p className={"font-medium text-4xl"}>Checkout</p>
                    <CheckoutForm onSubmit={placeOrder}/>
                </div>

                {/* --------- Right Section --------- */}
                <aside className="w-2/3 text-black p-6 border rounded-lg flex flex-col justify-between h-full">
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
                                {cart.items.map(ci => <CartItemCard page={"checkout"} key={ci.id} cartItem={ci}/>)}
                            </div>
                        </div>
                    </div>

                    <button
                        form="checkoutForm"
                        type="submit"
                        className="cursor-pointer mt-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded w-full transition"
                    >
                        Place Order
                    </button>
                </aside>
            </div>
        </div>
    );
}
