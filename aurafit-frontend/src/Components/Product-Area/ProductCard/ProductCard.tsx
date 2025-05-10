// ProductCard.tsx
import {JSX} from "react";
import {NavLink} from "react-router-dom";
import {ProductVariant} from "../../../Models/ProductVariant.ts";

interface ProductCardProps {
    // variant: ProductVariant;
}

export function ProductCard(): JSX.Element {

    return (
        <NavLink to="/product" className="block text-gray-700 cursor-pointer">
            {/* Image / Placeholder */}
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden" />

            {/* Details */}
            <div className="flex justify-between items-center pt-2 px-2">
                <p className="text-lg truncate">Product Name</p>
                <p className="text-xl font-medium">$15</p>
            </div>

            <p className="px-2 text-sm text-gray-600">Black</p>
        </NavLink>
    );
}
