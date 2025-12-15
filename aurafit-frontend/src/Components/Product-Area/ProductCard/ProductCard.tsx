import React, { useEffect, useMemo, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import defaultImage from "../../../assets/defaultImage.png";
import { ProductDTO } from "../../../Models/DTOS/ProductDTO.ts";
import { ProductVariantDTO } from "../../../Models/DTOS/ProductVariantDTO.ts";
import { useUserSelector } from "../../../Redux/hooks.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import { NotLoggedInModal } from "../../NotLoggedInModal/NotLoggedInModal.tsx";

interface ProductCardProps {
    product: ProductDTO;
    variants: ProductVariantDTO[];
}

export function ProductCard({ product, variants = [] }: ProductCardProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUserSelector(state => state.authSlice.user);

    const [onWishlist, setOnWishlist] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            wishlistService
                .isOnWishlist(product.id)
                .then(setOnWishlist)
                .catch(err => toast.error(err.response?.data || "Error fetching wishlist"));
        }
    }, [user, product.id]);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
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

    const [activeVariantId, setActiveVariantId] = useState(
        variants[0]?.id ?? 0
    );

    const imageUrl =
  product.variants?.[0]?.images?.[0]?.imageUrl ?? "/placeholder.png";

    return (
        <div className="block bg-white rounded-lg overflow-hidden">
         
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
                    className="absolute top-5 right-5 p-2 bg-white rounded-full shadow z-10"
                >
                    {onWishlist ? <AiFillHeart size={20} /> : <BiHeart size={20} />}
                </button>


            </div>

            {/* Title, price, color selector */}
            <div className="px-2 mt-2">
                <h3 className="text-md font-medium truncate">{product.name}</h3>
                <span className="text-lg font-semibold">${product.variants[0].basePrice.toFixed(2)}</span>
            </div>

            {/* not-logged-in modal */}
            {modalOpen && (
                <NotLoggedInModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}


