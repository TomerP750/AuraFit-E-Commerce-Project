// ProductCard.tsx
import {JSX} from "react";
import {NavLink} from "react-router-dom";
import {ProductVariant} from "../../../Models/ProductVariant.ts";

interface ProductCardProps {
    variant: ProductVariant;
}

export function ProductCard({variant}: ProductCardProps): JSX.Element {

    if (!variant) {
        return (
            <div className="p-4 border rounded shadow-sm text-center text-gray-500">
                Product data unavailable
            </div>
        );
    }

    return (
        <NavLink to={`/product/${variant.id}`} className="block text-gray-700 cursor-pointer">
            {/* Image / Placeholder */}
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden" />

            {/* Details */}
            <div className="flex justify-between items-center pt-2 px-2">
                <p className="text-lg truncate">{variant.product.name}</p>
                {/*//TODO add sale price if onsale*/}
                <p className="text-xl font-medium">{variant.basePrice}</p>
            </div>

            <p className="px-2 text-sm text-gray-600">{variant.color.color}</p>
        </NavLink>
    );
}
