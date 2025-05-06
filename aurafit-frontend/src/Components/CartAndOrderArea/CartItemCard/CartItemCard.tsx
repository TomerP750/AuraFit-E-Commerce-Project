import "./CartItemCard.css";
import {JSX} from "react";


interface CartItemCardProps {
    name: string;
    color: string;
    basePrice: number;
    size: string;
}

export function CartItemCard({name, basePrice, size, color}: CartItemCardProps): JSX.Element {
    return (
        <>
            <div className="flex w-4/5 justify-between items-center">
                {/*    Left Section*/}
                <div className={"w-[200px] h-[200px] bg-gray-500"}/>
                {/*	Right Section*/}
                <div className="w-3/4 justify-between flex flex-col h-full">
                    {/*    right section top*/}
                    <div className="flex justify-between w-9/10">
                        <ul>
                            <li className={"font-medium text-xl"}>{name}</li>
                            <li className={"text-lg"}>{size}</li>
                            <li className={"text-lg"}>{color}</li>
                        </ul>
                        <p className={"text-lg font-medium"}>${basePrice}</p>
                    </div>

                    {/*    right section bottom*/}
                    <div className="flex justify-end w-9/10">
                        <button className={"text-purple-900 cursor-pointer"}>Remove</button>
                    </div>
                </div>
            </div>
            <hr className={"w-4/5 h-px bg-gray-300 border-0 my-4"}/>
        </>
    );
}
