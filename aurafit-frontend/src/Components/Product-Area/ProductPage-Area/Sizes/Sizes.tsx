import "./Sizes.css";
import {JSX} from "react";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";
import {Size} from "../../../../Models/Size.ts";

interface SizesProps {
    sizes: Size[];
    availableSizes: Size[];
    selected: Size | null;
    onSelect(size: Size): void;
}

export function Sizes({sizes, availableSizes, selected, onSelect}: SizesProps): JSX.Element {
    // return (
    //     <div className="w-full flex flex-col gap-4">
    //         <div className="flex items-center justify-between">
    //             <p>Size</p>
    //             <p>Sizing chart</p>
    //         </div>
    //         <div className="flex gap-3 items-center">
    //             <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>S</button>
    //             <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>M</button>
    //             <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>L</button>
    //             <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>XL</button>
    //             <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>XXL</button>
    //         {/*        TODO give all the sizes based on the product type maybe make a service method*/}
    //
    //         </div>
    //     </div>
    // );

    const availableIds = new Set(availableSizes.map((s) => s.id));

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p className="font-medium">Size</p>
                <p className="text-sm text-blue-600 cursor-pointer">
                    Sizing chart
                </p>
            </div>
            <div className="flex gap-3">
                {sizes.map((size) => {
                    const isAvailable = availableIds.has(size.id);
                    const isSelected = selected?.id === size.id;

                    return (
                        <button
                            key={size.id}
                            onClick={() => isAvailable && onSelect(size)}
                            disabled={!isAvailable}
                            className={`px-4 py-1 border rounded ${isSelected ? "bg-black text-white" 
                                : isAvailable ? "hover:bg-gray-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                        >
                            {size.size}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
