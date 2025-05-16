import "./ShopGenders.css";
import {JSX} from "react";
import cardAcc from "../../../assets/cardShopAcc.png"
import cardMen from "../../../assets/cardShopMen.png"
import cardWomen from "../../../assets/cardShopWomen.png"

export function ShopGenders(): JSX.Element {
    return (
        <div className="flex flex-col items-center w-full gap-6">
            <p className={"text-4xl font-medium"}>Shop</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                <div className="relative aspect-square">
                    <img
                        src={cardMen}
                        alt="men"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Men
                    </button>
                </div>

                {/* --- WOMEN --- */}
                <div className="relative aspect-square">
                    <img
                        src={cardWomen}
                        alt="women"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Women
                    </button>
                </div>

                {/* --- ACCESSORIES --- */}
                <div className="relative aspect-square">
                    <img
                        src={cardAcc}
                        alt="accessories"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Accessories
                    </button>
                </div>

            </div>
        </div>
    );
}
