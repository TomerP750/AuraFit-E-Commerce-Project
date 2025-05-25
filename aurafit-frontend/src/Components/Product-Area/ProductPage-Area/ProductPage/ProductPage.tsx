// import "./ProductPage.css";
// import {JSX, useContext, useEffect, useState} from "react";
// import { NavLink, useParams } from "react-router-dom";
// import { TitlePriceReviews } from "../TitlePriceReviews/TitlePriceReviews.tsx";
// import { Colors } from "../Colors/Colors.tsx";
// import { Sizes } from "../Sizes/Sizes.tsx";
// import { Description } from "../Description/Description.tsx";
// import { Buttons } from "../Buttons/Buttons.tsx";
// import { FabricAndCare } from "../FabricAndCare/FabricAndCare.tsx";
// import { Images } from "../Images/Images.tsx";
// import { ProductReviews } from "../../ProductReviews/ProductReviews.tsx";
// import { toast } from "react-toastify";
// import { ProductVariant } from "../../../../Models/ProductVariant.ts";
// import displayService from "../../../../Services/DisplayService.ts";
// import { Size } from "../../../../Models/Size.ts";
// import { Color } from "../../../../Models/Color.ts";
// import cartService from "../../../../Services/CartService.ts";
// import { AddToCartRequestDTO } from "../../../../Models/DTOS/AddToCartRequestDTO.ts";
// import wishlistService from "../../../../Services/WishlistService.ts";
// import {store} from "../../../../Redux/store.ts";
// import {cartSlice, increment} from "../../../../Redux/CartSlice.ts";
//
// export function ProductPage(): JSX.Element {
//     const { id } = useParams();
//     const productId = Number(id);
//
//     const [variants, setVariants] = useState<ProductVariant[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedColor, setSelectedColor] = useState<Color | null>(null);
//     const [selectedSize, setSelectedSize] = useState<Size | null>(null);
//     const [addedToWishlist, setAddedToWishlist] = useState(false);
//     const [allSizes, setAllSizes] = useState<Size[]>([]);
//     const [sizeError, setSizeError] = useState(false);
//
//
//     // Fetch all variants for this product
//     useEffect(() => {
//         setLoading(true);
//         displayService.allVariantsByProductId(productId)
//             .then((res) => setVariants(res))
//             .catch((err) => toast.error(err.response.data))
//             .finally(() => setLoading(false));
//     }, [productId]);
//
//     // Fetch list of sizes for this product's type
//     useEffect(() => {
//         if (!variants.length) return;
//         const productTypeId = variants[0].product.productType.id;
//         displayService.allSizesByProductType(productTypeId)
//             .then((res) => setAllSizes(res))
//             .catch((err) => toast.error(err.response.data));
//     }, [variants]);
//
//     // Default to first color
//     useEffect(() => {
//         if (!variants.length) return;
//         setSelectedColor(variants[0].color);
//         setSelectedSize(null);
//     }, [variants]);
//
//
//
//     // Only a "current" variant when both color & size are chosen
//     const currentVariant: ProductVariant | null = selectedColor && selectedSize ?
//         variants.find(
//             (v) =>
//                 v.color.id === selectedColor.id &&
//                 v.size.id === selectedSize.id) ?? null : null;
//
//     useEffect(() => {
//         if (currentVariant) {
//             wishlistService.isOnWishlist(defaultVariant.product.id)
//                 .then((res) => setAddedToWishlist(res))
//                 .catch((err) => toast.error(err.response.data))
//         }
//
//     }, [currentVariant]);
//
//     if (loading) {
//         return <div className="text-center py-20">Loading product…</div>;
//     }
//
//     if (!variants.length) {
//         return <div className="text-center py-20">No product variants found.</div>;
//     }
//
//     const defaultVariant = variants[0];
//
//     // Unique colors available
//     const availableColors = variants.reduce<Color[]>((acc, v) => {
//         if (!acc.find((c) => c.id === v.color.id)) {
//             acc.push(v.color);
//         }
//         return acc;
//     }, []);
//
//     // Sizes for the selected color only
//     const availableSizes = selectedColor
//         ? variants
//             .filter((v) => v.color.id === selectedColor.id)
//             .map((v) => v.size)
//         : [];
//
//     // // Only a "current" variant when both color & size are chosen
//     // const currentVariant: ProductVariant | null = selectedColor && selectedSize ?
//     //         variants.find(
//     //             (v) =>
//     //                 v.color.id === selectedColor.id &&
//     //                 v.size.id === selectedSize.id) ?? null : null;
//
//
//     // Handlers
//     const onColorSelect = (color: Color) => {
//         const canon = variants.find((v) => v.color.id === color.id)!.color;
//         setSelectedColor(canon);
//         setSelectedSize(null);
//         setSizeError(false);
//     };
//
//     const onSizeSelect = (size: Size) => {
//         setSelectedSize(size);
//         setSizeError(false);
//     };
//
//     const handleWishlist = (productId: number) => {
//
//
//         wishlistService.toggleWishlist(productId)
//             .then((res) => {
//                 if (addedToWishlist) {
//                     toast.success("Remove from wishlist");
//                 } else {
//                     toast.success("Added to wishlist")
//                 }
//                 setAddedToWishlist(res)
//             })
//             .catch((err) => toast.error(err.response.data));
//
//     };
//
//     const handleAddToCart = () => {
//         if (!currentVariant) {
//             setSizeError(true);
//             return;
//         }
//
//         setSizeError(false);
//         const dto = new AddToCartRequestDTO(currentVariant.id, 1);
//         cartService.addToCart(dto)
//             .then(() => {
//                 store.dispatch(increment())
//                 toast.success("Added to cart")
//             })
//             .catch((err) => toast.error(err.response.data));
//     };
//
//
//     return (
//         <div className="w-full flex flex-col items-center gap-30">
//             <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
//                 {/* Breadcrumbs */}
//                 <nav className="flex gap-2 text-gray-600">
//                     <NavLink to="/">Home</NavLink>
//                     <span>/</span>
//                     <NavLink to="/men">Men</NavLink>
//                     <span>/</span>
//                     <span>{defaultVariant.product.name}</span>
//                 </nav>
//
//                 {/* Main content */}
//                 <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
//                     {/* Left: Images gallery for the selected or default variant */}
//                     <Images/>
//
//                     {/* Right: Details and controls */}
//                     <aside className="flex-1 flex flex-col gap-8">
//                         <TitlePriceReviews
//                             variant={currentVariant ?? defaultVariant}
//                         />
//
//                         <Colors
//                             colors={availableColors}
//                             selected={selectedColor}
//                             onSelect={onColorSelect}
//                         />
//
//                         {/* Size selector with error styling only after failed add-to-cart */}
//                         <div
//                             className={`w-full ${
//                                 sizeError ? "border border-red-500 rounded p-2" : ""
//                             }`}
//                         >
//                             <Sizes
//                                 sizes={allSizes}
//                                 availableSizes={availableSizes}
//                                 selected={selectedSize}
//                                 onSelect={onSizeSelect}
//                             />
//                         </div>
//                         {sizeError && (
//                             <p className="mt-1 text-red-600 text-sm">
//                                 Please choose a size before adding to cart.
//                             </p>
//                         )}
//
//                         <Buttons
//                             onWishlist={() => {
//                                 // if (!currentVariant) {
//                                 //     setSizeError(true);
//                                 //     return;
//                                 // }
//                                 handleWishlist(defaultVariant.product.id);
//                             }}
//                             addedToWishlist={addedToWishlist}
//                             onAddToCart={handleAddToCart}
//                             disabled={!currentVariant}
//                         />
//
//                         <Description variant={defaultVariant} />
//                         <FabricAndCare variant={defaultVariant} />
//                     </aside>
//                 </section>
//             </div>
//
//             {/* Reviews Section */}
//             <section className="flex flex-col w-full items-center gap-12">
//                 <ProductReviews product={defaultVariant.product} />
//             </section>
//         </div>
//     );
// }



// src/pages/ProductPage.tsx
import "./ProductPage.css";
import {JSX, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import { TitlePriceReviews } from "../TitlePriceReviews/TitlePriceReviews";
import { Colors } from "../Colors/Colors";
import { Sizes } from "../Sizes/Sizes";
import { Description } from "../Description/Description";
import { Buttons } from "../Buttons/Buttons";
import { FabricAndCare } from "../FabricAndCare/FabricAndCare";
import { Images } from "../Images/Images";
import { ProductReviews } from "../../ProductReviews/ProductReviews";
import { toast } from "react-toastify";
import { ProductVariant } from "../../../../Models/ProductVariant";
import displayService from "../../../../Services/DisplayService";
import { Size } from "../../../../Models/Size";
import { Color } from "../../../../Models/Color";
import cartService from "../../../../Services/CartService";
import { AddToCartRequestDTO } from "../../../../Models/DTOS/AddToCartRequestDTO";
import wishlistService from "../../../../Services/WishlistService";
import { store } from "../../../../Redux/store";
import { increment } from "../../../../Redux/CartSlice";
import {useUserSelector} from "../../../../Redux/hooks.ts";

// We need an index signature so TS is happy with useParams<Params>()
interface Params {
    id: string;
    variantId?: string;
    [key: string]: string | undefined;
}

export function ProductPage(): JSX.Element {
    // grab both params
    const { id, variantId } = useParams<Params>();
    const productId = Number(id);
    const variantParam = variantId ? Number(variantId) : undefined;
    const navigate = useNavigate();
    const user = useUserSelector(state => state.authSlice.user);

    const [variants, setVariants]           = useState<ProductVariant[]>([]);
    const [loading, setLoading]             = useState(true);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize]   = useState<Size | null>(null);
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [allSizes, setAllSizes]           = useState<Size[]>([]);
    const [sizeError, setSizeError]         = useState(false);

    // 1️⃣ Fetch variants for this product
    useEffect(() => {
        setLoading(true);
        displayService
            .allVariantsByProductId(productId)
            .then(res => setVariants(res))
            .catch(err => toast.error(err.response?.data || err.message))
            .finally(() => setLoading(false));
    }, [productId]);

    useEffect(() => {
        if (!variants.length) return;
        const defaultVariant =
            variantParam != null
                ? variants.find(v => v.id === variantParam)
                : undefined;
        setSelectedColor(
            defaultVariant ? defaultVariant.color : variants[0].color
        );
    }, [variants, variantParam]);

    useEffect(() => {
        if (!variants.length) return;
        const productTypeId = variants[0].product.productType.id;
        displayService
            .allSizesByProductType(productTypeId)
            .then(setAllSizes)
            .catch(err => toast.error(err.response?.data || err.message));
    }, [variants]);

    const currentVariant =
        selectedColor && selectedSize
            ? variants.find(
            v =>
                v.color.id === selectedColor.id &&
                v.size.id === selectedSize.id
        ) ?? null
            : null;

    useEffect(() => {
        const checkId = productId;
        if (!checkId) return;
        if (user) {
            wishlistService.isOnWishlist(checkId)
                .then(res => setAddedToWishlist(res))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    }, [currentVariant, variantParam, variants]);

    if (loading) {
        return <div className="text-center py-20">Loading product…</div>;
    }
    if (!variants.length) {
        return <div className="text-center py-20">No product variants found.</div>;
    }

    const defaultVariant =
        variants.find(v => v.id === variantParam) || variants[0];

    const availableColors = Array.from(
        new Map(variants.map(v => [v.color.id, v.color])).values()
    );
    const availableSizes = selectedColor
        ? variants
            .filter(v => v.color.id === selectedColor.id)
            .map(v => v.size)
        : [];

    // Handlers
    const onColorSelect = (color: Color) => {
        setSelectedColor(color);
        setSelectedSize(null);
        setSizeError(false);
    };
    const onSizeSelect = (size: Size) => {
        setSelectedSize(size);
        setSizeError(false);

        // find the exact variant for current color+size:
        if (selectedColor) {
            const next = variants.find(
                v => v.color.id === selectedColor.id && v.size.id === size.id
            );
            if (next) {
                // navigate to /product/:productId/:variantId
                navigate(`/product/${productId}/${next.id}`);
            }
        }
    };
    const handleWishlist = () => {
        if (user) {
            wishlistService.toggleWishlist(defaultVariant.product.id)
                .then(res => {
                    toast.success(res ? "Added to wishlist" : "Removed from wishlist");
                    setAddedToWishlist(res);
                })
                .catch(err => toast.error(err.response?.data || err.message));
        } else {
            navigate("/login")
        }
    };
    const handleAddToCart = () => {
        if (!currentVariant) {
            setSizeError(true);
            return;
        }
        setSizeError(false);
        cartService
            .addToCart(new AddToCartRequestDTO(currentVariant.id, 1))
            .then(() => {
                store.dispatch(increment());
                toast.success("Added to cart");
            })
            .catch(err => toast.error(err.response?.data || err.message));
    };

    const gender = defaultVariant.product.gender;
    const titleCase = gender.charAt(0) + gender.slice(1).toLowerCase();

    return (
        <div className="w-full flex flex-col items-center gap-30">
            <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
                {/* Breadcrumbs */}
                <nav className="flex gap-2 text-gray-600">
                    <NavLink to="/">Home</NavLink>
                    <span>/</span>
                    <NavLink to={`/${defaultVariant.product.gender.toLowerCase()}`}>{titleCase}</NavLink>
                    <span>/</span>
                    <span>{defaultVariant.product.name}</span>
                </nav>

                <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
                    {/* Left: Images for defaultVariant */}
                    <Images variant={defaultVariant} />

                    {/* Right: Details & controls */}
                    <aside className="flex-1 flex flex-col gap-8">
                        <TitlePriceReviews variant={defaultVariant} />

                        <Colors
                            colors={availableColors}
                            selected={selectedColor}
                            onSelect={onColorSelect}
                            variants={variants}
                        />

                        <div className={sizeError ? "border border-red-500 rounded p-2" : ""}>
                            <Sizes
                                sizes={allSizes}
                                availableSizes={availableSizes}
                                selected={selectedSize}
                                onSelect={onSizeSelect}
                            />
                        </div>
                        {sizeError && (
                            <p className="mt-1 text-red-600 text-sm">
                                Please choose a size before adding to cart.
                            </p>
                        )}

                        <Buttons
                            onWishlist={handleWishlist}
                            addedToWishlist={addedToWishlist}
                            onAddToCart={handleAddToCart}
                            disabled={!currentVariant}
                        />

                        <Description variant={defaultVariant} />
                        <FabricAndCare variant={defaultVariant} />
                    </aside>
                </section>
            </div>

            <section className="flex flex-col w-full items-center gap-12">
                <ProductReviews product={defaultVariant.product} />
            </section>
        </div>
    );
}
