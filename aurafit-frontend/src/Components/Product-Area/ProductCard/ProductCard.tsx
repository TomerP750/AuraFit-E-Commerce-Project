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
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import wishlistService from "../../../Services/WishlistService.ts";
import cartService from "../../../Services/CartService.ts";
import { toast } from "react-toastify";
import { ProductDTO } from "../../../Models/DTOS/ProductDTO.ts";
import { AddToCartRequestDTO } from "../../../Models/DTOS/AddToCartRequestDTO.ts";
import { useUserSelector } from "../../../Redux/hooks.ts";
import { NotLoggedInModal } from "../../NotLoggedInModal/NotLoggedInModal.tsx";
import { useDispatch } from "react-redux";
import { increment } from "../../../Redux/CartSlice.ts";
import { ProductVariantDTO } from "../../../Models/DTOS/ProductVariantDTO.ts";
import defaultImage from "../../../assets/defaultImage.png";
import {SizeCrudDTO} from "../../../Models/DTOS/SizeCrudDTO.ts";
import {Size} from "../../../Models/Size.ts";
import displayService from "../../../Services/DisplayService.ts";
import {SizeDTO} from "../../../Models/DTOS/SizeDTO.ts";

interface ProductCardProps {
    product: ProductDTO;
    variants: ProductVariantDTO[];
}

// simple “pop in/out” animation for the size picker
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
    const [hoverSizes, setHoverSizes]   = useState(false);

    const [sizes, setSizes]   = useState<SizeDTO[]>([]);

    useEffect(() => {
        displayService
            //TODO change this method name from test to work
            .allSizesByProductTypeTest(product.productType.id)
            .then(res => {
                setSizes(res)
            })
            .catch(err => toast.error(err));
    }, [product.productType.id]);

    const filteredSizes = useMemo<SizeDTO[]>(
        () => sizes.filter(s => s.productType.id === product.productType.id),
        [sizes, product.productType.id]
    );

    // fetch initial wishlist state
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

    // pick one variant per color for the color‐dot row
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

    // track which color / variant is active
    const [selectedColorId, setSelectedColorId] = useState(
        uniqueByColor[0]?.color.id ?? 0
    );
    const [activeVariantId, setActiveVariantId] = useState(
        variants[0]?.id ?? 0
    );

    // whenever variants change, reset to first color
    useEffect(() => {
        if (uniqueByColor.length) {
            const firstColor = uniqueByColor[0].color.id;
            setSelectedColorId(firstColor);
            const fv = variants.find(v => v.color.id === firstColor);
            if (fv) setActiveVariantId(fv.id);
        }
    }, [variants, uniqueByColor]);

    // nothing to show if no variants
    if (!variants.length || !selectedColorId) return null;

    // sizes for the overlay picker
    const sizesForColor = variants.filter(v => v.color.id === selectedColorId);
    // the currently displayed variant
    const activeVariant =
        variants.find(v => v.id === activeVariantId) || sizesForColor[0];

    const imageUrl = activeVariant?.images?.[0]?.imageUrl || defaultImage;
    const price = activeVariant.onSale ? activeVariant.salePrice : activeVariant.basePrice;

    const handleAddToCart = (variantId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const dto = new AddToCartRequestDTO(variantId, 1);
        if (user) {
            cartService
                .addToCart(dto)
                .then(() => {
                    dispatch(increment());
                    toast.success("Added to cart");
                })
                .catch(err => toast.error(err.response?.data || "Error adding to cart"));
        } else {
            cartService
                .addToGuestCart(dto)
                .then(() => {
                    dispatch(increment());
                    toast.success("Added to cart");
                })
                .catch(err => toast.error(err.response?.data || "Error adding to cart"));
        }
    };

    return (
        <div className="block bg-white rounded-lg overflow-hidden">
            {/* Image + hover‐trigger */}
            <div
                className="relative w-full aspect-square bg-gray-100 cursor-pointer"
                onMouseEnter={() => setHoverSizes(true)}
                onMouseLeave={() => setHoverSizes(false)}
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

                {/* size‐picker overlay */}
                <AnimatePresence>
                    {hoverSizes && (
                        <motion.div
                            key="sizes"
                            variants={popupVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="
        absolute bottom-0 left-0 right-0
        p-3
        bg-white bg-opacity-75
        grid grid-cols-4      /* 4 per row */
        gap-3
        justify-items-center
        z-20
      "
                        >
                            {filteredSizes.map(sizeEntity => {
                                const label     = sizeEntity.size;                            // e.g. "S", "M", ...
                                const variant   = sizesForColor.find(v => v.size.size === label);
                                const available = Boolean(variant);

                                return (
                                    <motion.button
                                        key={sizeEntity.id}                                      // use the entity’s unique id
                                        onClick={e => {
                                            if (!available) return;
                                            handleAddToCart(variant!.id, e);
                                        }}
                                        disabled={!available}
                                        whileTap={available ? { scale: 0.95 } : {}}
                                        className={`
              flex items-center justify-center
              w-20 h-12          /* adjust as you like */
              text-sm font-medium
              bg-white border rounded
              ${available
                                            ? "hover:bg-gray-100 cursor-pointer"
                                            : "opacity-50 cursor-not-allowed"
                                        }
            `}
                                    >
                                        {label}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>


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

