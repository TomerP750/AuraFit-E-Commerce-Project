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
        <div className={`flex flex-col sm:flex-row items-start justify-center bg-white ${1 < 3 ? 'h-screen' : ''} font-medium pb-10`}>
            <div className="w-4/5 flex justify-between items-start mt-20">
                {/*Left Section*/}
                <div className="flex flex-col w-full gap-10">
                    <div className={"flex gap-3 items-center font-medium text-3xl"}>
                        <BiCart/>
                        <p>Cart</p>
                    </div>
                    {/*{dummyProducts?.length > 0 ? dummyProducts.map(item => */}
                    {/*    <CartItemCard/>) : <span>עגלת הקניות שלך ריקה</span>}*/}
                    <CartItemCard basePrice={dummyProducts[0].basePrice}
                                                  size={dummyProducts[0].size} name={dummyProducts[0].name}
                                                  color={dummyProducts[0].color}/>
                    <CartItemCard basePrice={dummyProducts[0].basePrice}
                                                  size={dummyProducts[0].size} name={dummyProducts[0].name}
                                                  color={dummyProducts[0].color}/>
                </div>
                {/*    Right section*/}
                <div className="flex flex-col items-start bg-gray-100/40 px-10 w-[600px] gap-10 py-8">
                    <p className={"font-medium text-xl"}>Order Summery</p>
                    <div className="flex justify-between w-full">
                        <span className={"font-light"}>Subtotal</span>
                        <span>15$</span>
                    </div>
                    <div className="flex justify-between w-full">
                    <span className={"font-light"}>Shipping and handling</span>
                        <span>15$</span>
                    </div>
                    <div className="flex justify-between w-full">
                    <span className={"font-light"}>Tax</span>

                        <span>15$</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Total</span>
                        <span className={"font-medium"}>15$</span>

                    </div>

                    <button disabled={1 < 2} onClick={()=>navigate("/checkout")} className={"bg-[#1a1a1a] hover:bg-black px-10 py-4 text-white self-center cursor-pointer w-full active:-outline-offset-5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed "}>Checkout</button>
                </div>
            </div>
        </div>
    );
}
