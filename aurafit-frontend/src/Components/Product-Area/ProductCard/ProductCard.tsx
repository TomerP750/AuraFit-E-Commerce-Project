// // ProductCard.tsx
// import {JSX, useState} from "react";
// import {NavLink} from "react-router-dom";
// import {ProductVariant} from "../../../Models/ProductVariant.ts";
// import {BiHeart} from "react-icons/bi";
//
// interface ProductCardProps {
//     // variant: ProductVariant;
//     variants: ProductVariant[];
//     selectedVariantId?: number;
//     onAddToWishlist?: (id: number) => void;
// }
//
// export function ProductCard({variants, onAddToWishlist, selectedVariantId}: ProductCardProps): JSX.Element {
//
//     const defaultVariant = variants[0];
//     const hoverVariant = variants[1] || defaultVariant; // show second variant on hover if available
//
//     const [wishlistHovered, setWishlistHovered] = useState<boolean>(false);
//
//     const [isHovered, setIsHovered] = useState(false);
//
//     const [selectedId, setSelectedId] = useState<number>(
//         selectedVariantId ?? variants[0].id
//     );
//
//     if (!variants || variants.length === 0) {
//         return (
//             <div className="p-4 border rounded shadow-sm text-center text-gray-500">
//                 Product data unavailable
//             </div>
//         );
//     }
//
//     const selected = variants.find((v) => v.id === selectedId)!;
//     const handleHeart = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         onAddToWishlist?.(selected.product.id);
//     };
//
//     return (
//         <NavLink
//             to={`/product/${defaultVariant.product.id}`}
//             className="block text-gray-700 cursor-pointer"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Image with hover swap placeholder for now */}
//             <div className="relative w-full aspect-square bg-orange-100 rounded-lg overflow-hidden">
//
//                 <div onClick={handleHeart}
//                      className="absolute top-5 right-5 text-black bg-gray-100 p-3 rounded-full hover:bg-gray-200">
//                     <BiHeart className="size-5"/>
//                 </div>
//
//             </div>
//
//             {/* Details */}
//             <div className="flex justify-between items-center pt-2 px-2">
//                 <p className="text-lg truncate">{defaultVariant.product.name}</p>
//                 {defaultVariant.onSale ? (
//                     <div className="flex gap-2">
//                         <p className="text-lg font-medium text-green-500">
//                             ${defaultVariant.salePrice.toFixed(2)}
//                         </p>
//                         <p className="text-lg font-medium line-through">
//                             ${defaultVariant.basePrice.toFixed(2)}
//                         </p>
//                     </div>
//                 ) : (
//                     <p className="text-lg font-medium">
//                         ${defaultVariant.basePrice.toFixed(2)}
//                     </p>
//                 )}
//             </div>
//
//             {/* Color */}
//             <p className="px-2 text-sm text-gray-600">{defaultVariant.color.color}</p>
//         </NavLink>
//     );
// }


// src/components/ProductCard.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { Product } from "../../../Models/Product.ts";
import { ProductVariant } from "../../../Models/ProductVariant.ts";

interface ProductCardProps {
    product: Product;
    variants: ProductVariant[];
    onAddToWishlist?: (productId: number) => void;
}

export function ProductCard({
                                product,
                                variants = [],
                                onAddToWishlist,
                            }: ProductCardProps) {
    const navigate = useNavigate();

    // ⚠️ Hook at top level
    const [activeId, setActiveId] = useState<number>(variants[0]?.id ?? 0);

    // early return if no variants
    if (!variants.length) {
        return (
            <div className="p-4 bg-white rounded shadow-sm text-center text-gray-500">
                No variants available
            </div>
        );
    }

    // collapse to one variant per color
    const uniqueByColor = Array.from(
        variants.reduce<Map<number, ProductVariant>>((map, v) => {
            if (!map.has(v.color.id)) map.set(v.color.id, v);
            return map;
        }, new Map()).values()
    );

    // pick the active variant
    const activeVariant =
        variants.find(v => v.id === activeId) || variants[0];

    const imageUrl =
        activeVariant.productImage?.[0] ?? "/assets/placeholder.png";
    const price = activeVariant.onSale
        ? activeVariant.salePrice
        : activeVariant.basePrice;

    return (
        <NavLink
            to={`/product/${product.id}/${activeVariant.id}`}
            className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
        >
            {/* IMAGE & WISHLIST */}
            <div className="relative w-full aspect-square bg-gray-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                {onAddToWishlist && (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            onAddToWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-500 hover:text-red-500"
                    >
                        <BiHeart size={20} />
                    </button>
                )}
            </div>

            {/* COLOR SWATCHES (one per color) */}
            <div className="flex space-x-2 mt-2 px-2">
                {uniqueByColor.map(variant => (
                    <button
                        key={variant.color.id}
                        onClick={e => {
                            e.preventDefault();
                            setActiveId(variant.id);
                            navigate(`/product/${product.id}/${variant.id}`);
                        }}
                        className={`w-5 h-5 rounded-full border-2 focus:outline-none cursor-pointer ${
                            variant.id === activeVariant.id
                                ? "border-gray-800"
                                : "border-transparent"
                        }`}
                        style={{ backgroundColor: variant.color.color.toLowerCase() }}
                        aria-label={`Color ${variant.color.color}`}
                    />
                ))}
            </div>

            {/* NAME & PRICE */}
            <div className="p-3 flex justify-between items-center">
                <h3 className="text-sm font-medium truncate">{product.name}</h3>
                <span className="text-sm font-semibold">${price.toFixed(2)}</span>
            </div>
        </NavLink>
    );
}

