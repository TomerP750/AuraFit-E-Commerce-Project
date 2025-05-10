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
        <div className="flex flex-col sm:flex-row w-full bg-white rounded-md shadow-sm overflow-hidden">
            {/* Image Placeholder */}
            <div className="w-full sm:w-1/3 md:w-1/4 aspect-square bg-gray-200 flex-shrink-0"/>

            {/* Details & Actions */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* Text Info */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-lg truncate">{name}</p>
                            <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                <BiX size={25}/>
                            </button>
                        </div>
                        <div className="flex flex-col items-start gap-2 text-sm text-gray-600 mt-1">
                            <div className="flex gap-5">
                                <span>{size}</span>
                                <span className="text-gray-400 font-light">|</span>
                                <span>{color}</span>
                            </div>
                            <p className="font-semibold text-md">${basePrice}</p>
                        </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex justify-between sm:justify-start items-center gap-4">


                    </div>
                </div>

                {/* Bottom divider on small screens */}
                <hr className="block sm:hidden mt-4 border-gray-300"/>
            </div>
        </div>
    );
}
