// ProductCard.tsx
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
import {BiHeart} from "react-icons/bi";
import {AiFillHeart} from "react-icons/ai";

interface ProductCardProps {
    // variant: ProductVariant;
    variants: ProductVariant[];
    selectedVariantId?: number;
    onAddToWishlist?: (id: number) => void;
}

export function ProductCard({variants, onAddToWishlist, selectedVariantId}: ProductCardProps): JSX.Element {

    const defaultVariant = variants[0];
    const hoverVariant = variants[1] || defaultVariant; // show second variant on hover if available

    const [wishlistHovered, setWishlistHovered] = useState<boolean>(false);

    const [isHovered, setIsHovered] = useState(false);

    const [selectedId, setSelectedId] = useState<number>(
        selectedVariantId ?? variants[0].id
    );

    if (!variants || variants.length === 0) {
        return (
            <div className="p-4 border rounded shadow-sm text-center text-gray-500">
                Product data unavailable
            </div>
        );
    }

    const selected = variants.find((v) => v.id === selectedId)!;
    const handleHeart = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToWishlist?.(selected.id);
    };

    return (
        <NavLink
            to={`/product/${defaultVariant.product.id}`}
            className="block text-gray-700 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image with hover swap placeholder for now */}
            <div className="relative w-full aspect-square bg-orange-100 rounded-lg overflow-hidden">

                <div onClick={handleHeart} className="absolute top-5 right-5 text-black bg-gray-100 p-3 rounded-full hover:bg-gray-200">
                    <BiHeart className="size-5"/>
                </div>

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

            {/* Color */}
            <p className="px-2 text-sm text-gray-600">{defaultVariant.color.color}</p>
        </NavLink>
    );
}
