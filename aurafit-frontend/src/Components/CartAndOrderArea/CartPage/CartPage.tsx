import "./CartPage.css";
import {JSX, useState} from "react";
import {Cart} from "../../../Models/Cart.ts";
import {CartItemCard} from "../CartItemCard/CartItemCard.tsx";

export function CartPage(): JSX.Element {

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
        <div className={`${1 < 3 ? 'h-screen' : ''} flex flex-col items-center justify-center `}>
			<div className="flex flex-col gap-15 items-center w-9/10 h-full justify-center">
                <p className={"text-5xl font-bold"}>Shopping Cart</p>
                {/*cart items container*/}
                <div className="flex flex-col gap-10 items-center w-4/5">
                    {/*{dummyProducts.map((product) => (*/}
                    <CartItemCard basePrice={dummyProducts[0].basePrice}
                                  size={dummyProducts[0].size} name={dummyProducts[0].name} color={dummyProducts[0].color} />
                    <CartItemCard basePrice={dummyProducts[0].basePrice}
                                  size={dummyProducts[0].size}  name={dummyProducts[0].name} color={dummyProducts[0].color} />
                     {/*))}*/}

                </div>
            </div>
        </div>
    );
}
