import "./ShopGenders.css";
import {JSX} from "react";
import cardAcc from "../../../assets/cardShopAcc.png"
import cardMen from "../../../assets/cardShopMen.png"
import cardWomen from "../../../assets/cardShopWomen.png"

export function ShopGenders(): JSX.Element {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center w-4/5 gap-6">
                <p className="text-4xl font-medium">Shop</p>

                {/* Single grid for all three cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
                    {/* --- MEN --- */}
                    <div className="relative aspect-square">
                        <img
                            src={cardMen}
                            alt="men"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl hover:bg-gray-200">
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
                        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl hover:bg-gray-200">
                            Shop Women
                        </button>
                    </div>

                    <div className="relative sm:col-span-2 w-full">
                        <div className="relative w-full pb-[50%]">
                            <img
                                src={cardAcc}
                                alt="accessories"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                            <button
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-2xl hover:bg-gray-200"
                            >
                                Shop Accessories
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}
