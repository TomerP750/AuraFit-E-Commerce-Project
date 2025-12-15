import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductDTO } from "../../../Models/DTOS/ProductDTO.ts";
import { ProductVariantDTO } from "../../../Models/DTOS/ProductVariantDTO.ts";
import { useUserSelector } from "../../../Redux/hooks.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import { NotLoggedInModal } from "../../NotLoggedInModal/NotLoggedInModal.tsx";

import displayService from "../../../Services/DisplayService.ts";
import { Color } from "../../../Models/Color.ts";

interface ProductCardProps {
    product: ProductDTO;
    variants: ProductVariantDTO[];
}

export function ProductCard({ product, variants = [] }: ProductCardProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUserSelector(state => state.authSlice.user);

    const [colors, setColors] = useState<Color[]>([]);
    const [onWishlist, setOnWishlist] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id ?? 0);

    useEffect(() => {
        displayService.allAvailableColorsForProduct(product.id)
            .then(res => setColors(res))
            .catch(err => toast.error(err.response.data));
    }, []);

    useEffect(() => {
        if (user) {
            wishlistService
                .isOnWishlist(product.id)
                .then(setOnWishlist)
                .catch(err => toast.error(err.response?.data || "Error fetching wishlist"));
        }
    }, [user, product.id]);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            setModalOpen(true);
            return;
        }
        wishlistService
            .toggleWishlist(product.id)
            .then(newVal => {
                setOnWishlist(newVal);
                toast.success(newVal ? "Added to wishlist" : "Removed from wishlist");
            })
            .catch(err => toast.error(err.response?.data || "Error updating wishlist"));
    };



    const imageUrl = product.variants?.[0]?.images?.[0]?.imageUrl ?? "/placeholder.png";

    return (
        <article className="block bg-white rounded-lg overflow-hidden">

            <div
                className="relative w-full aspect-square bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}/${activeVariantId}`)}
            >
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />

                <button
                    onClick={handleWishlistClick}
                    className="cursor-pointer absolute top-5 right-5 p-2 bg-white rounded-full shadow z-10"
                >
                   {onWishlist ? <AiFillHeart size={20} /> : <BiHeart size={20} />}
                </button>

            </div>

            {/* Title, price, color */}
            <div className="px-2 mt-2">
                <h3 className="text-md font-medium truncate">{product.name}</h3>
                <div className="flex gap-1.5 my-1">
                    {colors.length > 0 && colors.map(c => {
                        return <div
                            onClick={() => navigate(`/product/${product.id}/${activeVariantId}`)}
                            className="cursor-pointer w-5 aspect-square border rounded-full"
                            style={{ backgroundColor: c.color }} />
                    })}
                </div>
                <span className="text-lg font-semibold">${product.variants[0].basePrice.toFixed(2)}</span>
            </div>

            {/* not-logged-in modal in case of click on wishlist */}
            {modalOpen && (
                <NotLoggedInModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </article>
    );
}


