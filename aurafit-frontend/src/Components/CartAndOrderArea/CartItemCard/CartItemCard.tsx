import "./CartItemCard.css";
import {JSX} from "react";
import {BiX} from "react-icons/bi";


interface CartItemCardProps {
    name: string;
    color: string;
    basePrice: number;
    size: string;
}

export function CartItemCard({name, basePrice, size, color}: CartItemCardProps): JSX.Element {
    return (
        <>
            <div className="flex w-full justify-between items-center h-[200px]">
                {/*    Left Section*/}
                <div className={"w-[200px] h-full bg-gray-500"}/>
                {/*	Right Section*/}
                <div className="w-3/4 justify-between flex flex-col h-full">
                    {/*    right section top*/}
                    <div className="flex justify-between w-9/10 pl-5">
                        <ul className={"flex flex-col gap-2"}>
                            <li className={"font-medium text-xl"}>{name}</li>
                            <div className="flex gap-3 items-center">
                                <li className={"text-md"}>{size}</li>
                                <p className={"mx-2 text-gray-500/30 font-light"}>|</p>
                                <li className={"text-md"}>{color}</li>
                            </div>
                            <li className={"text-md"}>${basePrice}</li>
                        </ul>
                        <BiX className={"text-gray-500 cursor-pointer hover:text-black"} size={20}/>
                    </div>
                </div>
            </div>
            <hr className={"w-4/5 h-px bg-gray-300 border-0 my-4"}/>
        </>
    );
}
