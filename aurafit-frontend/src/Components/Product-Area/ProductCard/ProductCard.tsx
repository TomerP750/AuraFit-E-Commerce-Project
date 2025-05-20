// src/components/ProductCard.tsx
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BiHeart} from "react-icons/bi";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import {toast} from "react-toastify";
import {AiFillHeart} from "react-icons/ai";
import {ProductDTO} from "../../../Models/DTOS/ProductDTO.ts";

interface ProductCardProps {
    product: ProductDTO;
    variants: ProductVariant[];
}

export function ProductCard({product, variants = []}: ProductCardProps) {
    const navigate = useNavigate();
    const [onWishlist, setOnWishlist] = useState<boolean>(false);

    useEffect(() => {
        wishlistService.isOnWishlist(product.id)
            .then((isOnWishlist) => {
                    setOnWishlist(isOnWishlist)
                }
            )
            .catch(err => toast.error(err.response.data));
    }, [product.id])

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        wishlistService
            .toggleWishlist(product.id)
            .then((newVal: boolean) => {
                setOnWishlist(newVal);
                toast.success(newVal ? "Added to wishlist" : "Removed from wishlist");
            })
            .catch(err => {
                toast.error(err?.response?.data || "Error updating wishlist");
            });
    };


    const [activeId, setActiveId] = useState<number>(variants[0]?.id ?? 0);

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
    const activeVariant = variants.find(v => v.id === activeId) || variants[0];

    const imageUrl = activeVariant.productImage?.[0] ?? "/assets/placeholder.png";
    const price = activeVariant.onSale ? activeVariant.salePrice : activeVariant.basePrice;

    return (

        <div className="block bg-white rounded-lg overflow-hidden transition">
            {/* IMAGE & WISHLIST */}
            <div className="relative w-full aspect-square bg-gray-100 cursor-pointer"
                 onClick={() => navigate(`/product/${product.id}/${activeVariant.id}`)}>
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <div className={"absolute top-5 right-5 p-2 bg-white rounded-full text-gray-500 hover:bg-gray-200"}>
                    <button onClick={handleWishlistClick} className={"cursor-pointer"}>
                        {onWishlist ? <AiFillHeart size={20}/> : <BiHeart size={20}/>}
                    </button>
                </div>

            </div>

            <div className={"px-2 mt-2"}>
                {/* NAME & PRICE */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium truncate">{product.name}</h3>
                    <span className="text-md font-semibold">${price.toFixed(2)}</span>
                </div>

                {/* COLOR SWATCHES (one per color) */}
                <div className="flex gap-2 mt-2">
                    {uniqueByColor.map(variant => (
                        <button
                            key={variant.color.id}
                            onClick={e => {
                                e.preventDefault();
                                setActiveId(variant.id);
                                navigate(`/product/${product.id}/${variant.id}`);
                            }}
                            className={`w-5 h-5 rounded-full border-2 focus:outline-none cursor-pointer ${
                                variant.id === activeVariant.id ? "border-gray-800" : "border-transparent"
                            }`}
                            style={{backgroundColor: variant.color.color.toLowerCase()}}
                            aria-label={`Color ${variant.color.color}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

