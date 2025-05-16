import "./ShopGenders.css";
import {JSX} from "react";

export function ShopGenders(): JSX.Element {
    return (
        <div className="flex flex-col items-center w-full gap-6">
            <p className={"text-4xl font-medium"}>Shop</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                <div className="relative aspect-square bg-cyan-500">
                    <button
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Men
                    </button>
                </div>
                <div className="relative aspect-square bg-cyan-500">
                    <button
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Women
                    </button>
                </div>
                <div className="relative aspect-square bg-cyan-500">
                    <button
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-100 px-4 py-2 rounded rounded-2xl cursor-pointer hover:bg-gray-200">
                        Shop Accessories
                    </button>
                </div>

            </div>
        </div>
    );
}
