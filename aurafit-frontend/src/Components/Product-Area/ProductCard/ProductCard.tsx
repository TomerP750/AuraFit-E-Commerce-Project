// ProductCard.tsx
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";
import {ProductVariant} from "../../../Models/ProductVariant.ts";

interface ProductCardProps {
    // variant: ProductVariant;
    variants: ProductVariant[];
}

export function ProductCard({variants}: ProductCardProps): JSX.Element {

    // const defaultVariant = variants[0];
    //
    // if (!variants) {
    //     return (
    //         <div className="p-4 border rounded shadow-sm text-center text-gray-500">
    //             Product data unavailable
    //         </div>
    //     );
    // }
    //
    // return (
    //     <NavLink to={`/product/${defaultVariant.id}`} className="block text-gray-700 cursor-pointer">
    //         {/* Image / Placeholder */}
    //         <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden" />
    //
    //         {/* Details */}
    //         <div className="flex justify-between items-center pt-2 px-2">
    //             <p className="text-lg truncate">{defaultVariant.product.name}</p>
    //             {/*//TODO add sale price if onsale*/}
    //             {defaultVariant.onSale ? <p className="text-xl font-medium text-green-500">${defaultVariant.salePrice}</p> :
    //                 <p className="text-xl font-medium">${defaultVariant.basePrice}</p>}
    //         </div>
    //
    //         <p className="px-2 text-sm text-gray-600">{defaultVariant.color.color}</p>
    //     </NavLink>
    // );


    const defaultVariant = variants[0];
    const hoverVariant = variants[1] || defaultVariant; // show second variant on hover if available

    // Hover state
    const [isHovered, setIsHovered] = useState(false);

    if (!variants || variants.length === 0) {
        return (
            <div className="p-4 border rounded shadow-sm text-center text-gray-500">
                Product data unavailable
            </div>
        );
    }

    return (
        <NavLink
            to={`/product/${defaultVariant.product.id}`}
            className="block text-gray-700 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image with hover swap placeholder for now */}
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {/*<img*/}
                {/*    src={isHovered ? hoverVariant.imageUrl : defaultVariant.imageUrl}*/}
                {/*    alt={defaultVariant.product.name}*/}
                {/*    className="w-full h-full object-cover"*/}
                {/*/>*/}
            </div>

            {/* Details */}
            <div className="flex justify-between items-center pt-2 px-2">
                <p className="text-lg truncate">{defaultVariant.product.name}</p>
                {defaultVariant.onSale ? (
                    <p className="text-xl font-medium text-green-500">
                        ${defaultVariant.salePrice.toFixed(2)}
                    </p>
                ) : (
                    <p className="text-xl font-medium">
                        ${defaultVariant.basePrice.toFixed(2)}
                    </p>
                )}
            </div>

            {/* Color label */}
            <p className="px-2 text-sm text-gray-600">{defaultVariant.color.color}</p>
        </NavLink>
    );
}
