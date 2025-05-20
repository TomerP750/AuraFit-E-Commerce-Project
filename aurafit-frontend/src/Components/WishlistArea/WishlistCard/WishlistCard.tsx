import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import displayService from "../../../Services/DisplayService";
import wishlistService from "../../../Services/WishlistService";
import cartService from "../../../Services/CartService";
import { toast } from "react-toastify";
import { WishlistItem } from "../../../Models/WishlistItem";
import { ProductVariant } from "../../../Models/ProductVariant";
import { AddToCartRequestDTO } from "../../../Models/DTOS/AddToCartRequestDTO";
import {useDispatch} from "react-redux";
import {increment} from "../../../Redux/CartSlice.ts";

interface WishlistCardProps {
    wishlistItem: WishlistItem;
    onAddToCart: () => void;
}

const popupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
};

export function WishlistCard({ wishlistItem, onAddToCart }: WishlistCardProps) {
    const navigate = useNavigate();
    const product = wishlistItem.product;
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        displayService.allVariantsByProductId(product.id)
            .then(setVariants)
            .catch(err => toast.error(err));
    }, [product.id]);

    const uniqueByColor = useMemo(() =>
        Array.from(variants.reduce<Map<number, ProductVariant>>((map, v) => {
            if (!map.has(v.color.id)) map.set(v.color.id, v);
            return map;
        }, new Map()).values()), [variants]
    );

    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    useEffect(() => {
        if (uniqueByColor.length) setSelectedColorId(uniqueByColor[0].color.id);
    }, [uniqueByColor]);

    const [hoverCart, setHoverCart] = useState(false);

    if (!variants.length || selectedColorId === null) {
        return <div className="p-4 bg-white rounded shadow-sm text-center text-gray-500">Loading…</div>;
    }

    const sizesForColor = variants.filter(v => v.color.id === selectedColorId);
    const displayVariant = sizesForColor[0] ?? variants[0];
    const imageUrl = displayVariant.productImage?.[0] ?? "/assets/placeholder.png";
    const price = displayVariant.onSale ? displayVariant.salePrice : displayVariant.basePrice;


    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        wishlistService.deleteProductFromWishlist(wishlistItem.id)
            .then(() => toast.success("Removed from wishlist"))
            .catch(err => toast.error(err.response?.data || "Error"));
    };

    const handleAddVariantToCart = (variantId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const dto = new AddToCartRequestDTO(variantId, 1);
        cartService.addToCart(dto)
            .then(() => {
                toast.success("Added to cart"); onAddToCart();
                dispatch(increment())
            })
            .catch(err => toast.error(err.response?.data || "Error"));
    };

    return (
        <div className="block bg-white rounded-lg overflow-hidden">
            <div
                className="relative w-full aspect-[3/4] bg-gray-100"
                onClick={() => navigate(`/product/${product.id}/${displayVariant.id}`)}
            >
                <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-500 hover:bg-gray-200 z-10">
                    <button onClick={handleRemove}><AiFillHeart size={20} /></button>
                </div>
                <div
                    className="absolute inset-x-0 bottom-0 mb-4 flex justify-center z-10"
                    onMouseEnter={() => setHoverCart(true)}
                    onMouseLeave={() => setHoverCart(false)}
                >
                    <button className="bg-white p-2 rounded-full shadow">
                        <BiCart size={24} className="text-gray-700 hover:text-gray-900" />
                    </button>
                    <AnimatePresence>
                        {hoverCart && (
                            <motion.div
                                key="sizes"
                                variants={popupVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute bottom-full mb-2 w-[90%] max-h-40 overflow-y-auto bg-white shadow-lg"
                            >
                                {sizesForColor.map(v => (
                                    <motion.button
                                        key={v.id}
                                        onClick={e => handleAddVariantToCart(v.id, e)}
                                        className="w-full py-2 text-center text-sm hover:bg-gray-100"
                                        whileTap={{ scale: 0.95 }}
                                    >{v.size.size}</motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="px-2 mt-2">
                <h3 className="text-md font-medium truncate">{product.name}</h3>
                <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 mt-3 px-2 pb-4">
                {uniqueByColor.map(colorVariant => (
                    <button
                        key={colorVariant.color.id}
                        onClick={e => { e.stopPropagation(); setSelectedColorId(colorVariant.color.id); }}
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                            selectedColorId === colorVariant.color.id ? "border-gray-800" : "border-transparent"
                        }`}
                        style={{ backgroundColor: colorVariant.color.color.toLowerCase() }}
                        aria-label={`Color ${colorVariant.color.color}`}
                    />
                ))}
            </div>
        </div>
    );
}
