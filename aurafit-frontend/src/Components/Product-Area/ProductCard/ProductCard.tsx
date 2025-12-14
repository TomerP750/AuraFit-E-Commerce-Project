// // src/components/ProductCard.tsx
// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { BiHeart, BiCart } from "react-icons/bi";
// import { AiFillHeart } from "react-icons/ai";
// import { motion, AnimatePresence } from "framer-motion";
// import wishlistService from "../../../Services/WishlistService.ts";
// import cartService from "../../../Services/CartService.ts";
// import { toast } from "react-toastify";
// import { ProductDTO } from "../../../Models/DTOS/ProductDTO.ts";
// import { AddToCartRequestDTO } from "../../../Models/DTOS/AddToCartRequestDTO.ts";
// import { useUserSelector } from "../../../Redux/hooks.ts";
// import { NotLoggedInModal } from "../../NotLoggedInModal/NotLoggedInModal.tsx";
// import { useDispatch } from "react-redux";
// import { increment } from "../../../Redux/CartSlice.ts";
// import {ProductVariantDTO} from "../../../Models/DTOS/ProductVariantDTO.ts";
// import defaultImage from "../../../assets/defaultImage.png";
//
// interface ProductCardProps {
//     product: ProductDTO;
//     variants: ProductVariantDTO[];
// }
//
// const popupVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
// };
//
// export function ProductCard({ product, variants = [] }: ProductCardProps) {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useUserSelector(state => state.authSlice.user);
//
//     const [onWishlist, setOnWishlist] = useState<boolean>(false);
//     const [modalOpen, setModalOpen] = useState<boolean>(false);
//
//     useEffect(() => {
//         if (user) {
//             wishlistService.isOnWishlist(product.id)
//                 .then(setOnWishlist)
//                 .catch(err => toast.error(err.response?.data || "Error"));
//         }
//     }, [product.id, user]);
//
//     const handleWishlistClick = (e: React.MouseEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (user) {
//             wishlistService.toggleWishlist(product.id)
//                 .then((newVal: boolean) => {
//                     setOnWishlist(newVal);
//                     toast.success(newVal ? "Added to wishlist" : "Removed from wishlist");
//                 })
//                 .catch(err => toast.error(err.response?.data || "Error updating wishlist"));
//         } else {
//             setModalOpen(true);
//         }
//     };
//
//     const uniqueByColor = useMemo(() =>
//         Array.from(variants.reduce<Map<number, ProductVariantDTO>>((map, v) => {
//             if (!map.has(v.color.id)) map.set(v.color.id, v);
//             return map;
//         }, new Map()).values()), [variants]
//     );
//
//     const [selectedColorId, setSelectedColorId] = useState<number>(uniqueByColor[0]?.color.id ?? 0);
//     const [activeVariantId, setActiveVariantId] = useState<number>(variants[0]?.id ?? 0);
//     const [hoverSizes, setHoverSizes] = useState(false);
//
//     useEffect(() => {
//         if (uniqueByColor.length) {
//             const firstColor = uniqueByColor[0].color.id;
//             setSelectedColorId(firstColor);
//             const firstVariant = variants.find(v => v.color.id === firstColor);
//             if (firstVariant) setActiveVariantId(firstVariant.id);
//         }
//     }, [variants ,uniqueByColor]);
//
//     if (!variants.length || !selectedColorId) {
//         return (
//             <></>
//         );
//     }
//
//     const sizesForColor = variants.filter(v => v.color.id === selectedColorId);
//     const activeVariant = variants.find(v => v.id === activeVariantId) || sizesForColor[0];
//     const imageUrl = activeVariant?.images?.[0]?.imageUrl || defaultImage;
//     const price = activeVariant.onSale ? activeVariant.salePrice : activeVariant.basePrice;
//
//     const handleAddToCart = (variantId: number, e: React.MouseEvent) => {
//
//         e.stopPropagation();
//         const dto = new AddToCartRequestDTO(variantId, 1);
//
//         const loggedIn: boolean = user ? true : false;
//
//         if (loggedIn) {
//             cartService.addToCart(dto)
//                 .then(() => {
//                     dispatch(increment());
//                 })
//                 .catch(err => toast.error(err));
//         } else {
//
//             cartService.addToGuestCart(dto)
//                 .then(() => {
//                     dispatch(increment());
//                 })
//                 .catch(err => toast.error(err));
//         }
//     };
//
//     return (
//         <div className="block bg-white rounded-lg overflow-hidden transition">
//             <div
//                 className="relative w-full aspect-square bg-gray-100 cursor-pointer"
//                 onClick={() => navigate(`/product/${product.id}/${activeVariantId}`)}
//             >
//                 <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" onMouseEnter={() => setHoverSizes(true)} onMouseLeave={() => setHoverSizes(false)}
//                 />
//
//                 <button
//                     onClick={handleWishlistClick}
//                     className="absolute top-5 right-5 p-2 bg-white rounded-full text-gray-500 hover:bg-gray-200 z-10"
//                 >
//                     {onWishlist ? <AiFillHeart size={20} /> : <BiHeart size={20} />}
//                 </button>
//
//                 <div
//                     className="absolute inset-x-0 bottom-0 mb-4 flex justify-center z-10"
//                     onMouseEnter={() => setHoverSizes(true)}
//                     onMouseLeave={() => setHoverSizes(false)}
//                 >
//                     <button className="bg-white p-2 rounded-full shadow">
//                         <BiCart size={24} className="text-gray-700 hover:text-gray-900 cursor-pointer" />
//                     </button>
//                     <AnimatePresence>
//                         {hoverSizes && (
//                             <motion.div
//                                 key="sizes"
//                                 variants={popupVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                                 className="absolute bottom-full mb-2 w-[90%] max-h-40 overflow-y-auto bg-white shadow-lg"
//                             >
//                                 {sizesForColor.map(v => (
//                                     <motion.button
//                                         key={v.id}
//                                         onClick={e => handleAddToCart(v.id, e)}
//                                         className="w-full py-2 text-center text-sm hover:bg-gray-100 cursor-pointer"
//                                         whileTap={{ scale: 0.95 }}
//                                     >
//                                         {v.size.size}
//                                     </motion.button>
//                                 ))}
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//
//             <div className="px-2 mt-2">
//                 <h3 className="text-md font-medium truncate">{product.name}</h3>
//                 <span className="text-lg font-semibold">${price.toFixed(2)}</span>
//                 <div className="flex gap-2 mt-2">
//                     {uniqueByColor.map(variant => (
//                         <button
//                             key={variant.color.id}
//                             onClick={e => {
//                                 e.stopPropagation();
//                                 setSelectedColorId(variant.color.id);
//                                 setActiveVariantId(variant.id);
//                             }}
//                             className={`w-5 h-5 rounded-full border-2 focus:outline-none cursor-pointer ${variant.color.id === selectedColorId ? "ring ring-offset-2" : "border-transparent"}`}
//                             style={{ backgroundColor: variant.color.color.toLowerCase() }}
//                             aria-label={`Color ${variant.color.color}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//
//             {modalOpen && <NotLoggedInModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
//         </div>
//     );
// }



// src/components/ProductCard.tsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import defaultImage from "../../../assets/defaultImage.png";
import { AddToCartRequestDTO } from "../../../Models/DTOS/AddToCartRequestDTO.ts";
import { ProductDTO } from "../../../Models/DTOS/ProductDTO.ts";
import { ProductVariantDTO } from "../../../Models/DTOS/ProductVariantDTO.ts";
import { SizeDTO } from "../../../Models/DTOS/SizeDTO.ts";
import { increment } from "../../../Redux/CartSlice.ts";
import { useUserSelector } from "../../../Redux/hooks.ts";
import cartService from "../../../Services/CartService.ts";
import displayService from "../../../Services/DisplayService.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import { NotLoggedInModal } from "../../NotLoggedInModal/NotLoggedInModal.tsx";

interface ProductCardProps {
    product: ProductDTO;
    variants: ProductVariantDTO[];
}


const popupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit:   { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export function ProductCard({ product, variants = [] }: ProductCardProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useUserSelector(state => state.authSlice.user);

    const [onWishlist, setOnWishlist]   = useState(false);
    const [modalOpen, setModalOpen]     = useState(false);

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


    const uniqueByColor = useMemo(
        () =>
            Array.from(
                variants.reduce<Map<number, ProductVariantDTO>>((map, v) => {
                    if (!map.has(v.color.id)) map.set(v.color.id, v);
                    return map;
                }, new Map()).values()
            ),
        [variants]
    );


    const [selectedColorId, setSelectedColorId] = useState(
        uniqueByColor[0]?.color.id ?? 0
    );
    const [activeVariantId, setActiveVariantId] = useState(
        variants[0]?.id ?? 0
    );


    useEffect(() => {
        if (uniqueByColor.length) {
            const firstColor = uniqueByColor[0].color.id;
            setSelectedColorId(firstColor);
            const fv = variants.find(v => v.color.id === firstColor);
            if (fv) setActiveVariantId(fv.id);
        }
    }, [variants, uniqueByColor]);

   
    if (!variants.length || !selectedColorId) return null;

  
    const sizesForColor = variants.filter(v => v.color.id === selectedColorId);

    const activeVariant =
        variants.find(v => v.id === activeVariantId) || sizesForColor[0];

    const imageUrl = activeVariant?.images?.[0]?.imageUrl || defaultImage;
    const price = activeVariant.onSale ? activeVariant.salePrice : activeVariant.basePrice;

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

                {/* wishlist heart */}
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
                <span className="text-lg font-semibold">${price.toFixed(2)}</span>
                <div className="flex gap-2 mt-2">
                    {uniqueByColor.map(variant => (
                        <button
                            key={variant.color.id}
                            onClick={e => {
                                e.stopPropagation();
                                setSelectedColorId(variant.color.id);
                                setActiveVariantId(variant.id);
                            }}
                            className={`w-5 h-5 rounded-full border-2 focus:outline-none cursor-pointer ${
                                variant.color.id === selectedColorId
                                    ? "ring ring-offset-2"
                                    : "border-transparent"
                            }`}
                            style={{ backgroundColor: variant.color.color.toLowerCase() }}
                            aria-label={`Color ${variant.color.color}`}
                        />
                    ))}
                </div>
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

