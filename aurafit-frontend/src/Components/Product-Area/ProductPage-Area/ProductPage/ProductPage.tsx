import "./ProductPage.css";
import {JSX, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {TitlePriceReviews} from "../TitlePriceReviews/TitlePriceReviews.tsx";
import {Colors} from "../Colors/Colors.tsx";
import {Sizes} from "../Sizes/Sizes.tsx";
import {Description} from "../Description/Description.tsx";
import {Buttons} from "../Buttons/Buttons.tsx";
import {FabricAndCare} from "../FabricAndCare/FabricAndCare.tsx";
import {Images} from "../Images/Images.tsx";
import {ProductReviews} from "../../ProductReviews/ProductReviews.tsx";
import adminService from "../../../../Services/AdminService.ts";
import {Product} from "../../../../Models/Product.ts";
import {toast} from "react-toastify";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";
import displayService from "../../../../Services/DisplayService.ts";
import { Size } from "../../../../Models/Size.ts";
import {Color} from "../../../../Models/Color.ts";


// export function ProductPage(): JSX.Element {
//
//     // const [addedToWishlist, setAddedToWishlist] = useState(false);
//     const [variant, setVariant] = useState<ProductVariant>();
//     const [addedToWishlist, setAddedToWishlist] = useState(false);
//
//     const params = useParams();
//     const id = +params.id!;
//
//     const [selectedSize, setSelectedSize] = useState<Size>();
//     const [selectedColor, setSelectedColor] = useState<Color>();
//     // const addToCart = (variant: ProductVariant) => {
//     //
//     // }
//
//
//     useEffect(() => {
//         displayService.getOneProductVariant(id)
//             .then(res => {
//                 setVariant(res)
//             })
//             .catch(err => {
//                 toast.error(err.response.data)
//             });
//         console.log(variant);
//
//     },[id])
//
//     if (!variant) {
//         return <div className="text-center py-20">Loading product…</div>;
//     }
//
//     return (
//         <div className="w-full flex flex-col items-center gap-20 py-40">
//             <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
//                 {/* navigation links */}
//                 <div className="flex justify-start gap-5">
//                     <NavLink to={"/"}>Home</NavLink>
//                     <p className="text-gray-400">/</p>
//                     <NavLink to={"/"}>Men</NavLink>
//                     <p className="text-gray-400">/</p>
//                     <p>{variant.product.name}</p>
//                 </div>
//
//                 {/* Main section */}
//                 <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-5">
//
//                     {/* Left: images */}
//                     <Images/>
//
//                     {/* Right section */}
//                     <aside className="flex-1 flex flex-col items-start gap-20">
//                         <div className="w-full flex flex-col gap-5">
//                             <TitlePriceReviews variant={variant} />
//                             <Colors variant={variant}/>
//                             <Sizes variant={variant}/>
//                             <Buttons onWishlistClick={() => setAddedToWishlist(!addedToWishlist)}
//                                      isWishlisted={addedToWishlist}/>
//                         </div>
//
//                         <div className="flex flex-col w-full gap-10">
//                             <Description variant={variant} />
//                             <FabricAndCare variant={variant}/>
//                         </div>
//                     </aside>
//                 </section>
//             </div>
//             {/*Reviews Section*/}
//             <section className={"flex flex-col w-full items-center gap-20"}>
//                 <p className={"text-4xl font-medium"}>Reviews</p>
//                 <ProductReviews product={variant.product} />
//             </section>
//         </div>
//     );
// }


type ProductCardData = {
    productId: number;
    variants: ProductVariant[];
};

export function ProductPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [allSizes, setAllSizes] = useState<Size[]>([]);

    // Fetch all variants for this product
    useEffect(() => {
        setLoading(true);
        displayService.allVariantsByProductId(productId)
            .then(res => setVariants(res))
            .catch(err => toast.error(err.response.data))
            .finally(() => setLoading(false));
    }, [productId]);

    useEffect(() => {
        if (!variants.length) return;

        const productTypeId = variants[0].product.productType.id;
        displayService.allSizesByProductType(productTypeId)
            .then(res => setAllSizes(res))
            .catch(err => toast.error(err.response.data));
    }, [variants]);

    if (loading) {
        return <div className="text-center py-20">Loading product…</div>;
    }

    if (variants.length === 0) {
        return <div className="text-center py-20">No product variants found.</div>;
    }

    // Derive the variant to display (either chosen or default)
    const defaultVariant = variants[0];
    const availableColors = Array.from(new Set(variants.map(v => v.color)));
    const availableSizes = selectedColor
        ? variants.filter(v => v.color === selectedColor).map(v => v.size)
        : [];

    const currentVariant =
        selectedColor && selectedSize
            ? variants.find(
            v => v.color === selectedColor && v.size === selectedSize
        ) || defaultVariant
            : defaultVariant;

    // Handlers
    const onColorSelect = (color: Color) => {
        setSelectedColor(color);
        setSelectedSize(null);
    };

    const onSizeSelect = (size: Size) => {
        if (availableSizes.includes(size)) {
            setSelectedSize(size);
        }
    };

    const handleWishlist = () => setAddedToWishlist(prev => !prev);
    const handleAddToCart = () => {
        // Implement your cart logic here
        console.log('Adding to cart:', currentVariant);
    };

    return (
        <div className="w-full flex flex-col items-center gap-20 py-40">
            <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
                {/* Breadcrumbs */}
                <nav className="flex gap-2 text-gray-600">
                    <NavLink to="/">Home</NavLink>
                    <span>/</span>
                    <NavLink to="/men">Men</NavLink>
                    <span>/</span>
                    <span>{defaultVariant.product.name}</span>
                </nav>

                {/* Main content */}
                <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
                    {/* Left: Images gallery for currentVariant */}
                    <Images />

                    {/* Right: Details and controls */}
                    <aside className="flex-1 flex flex-col gap-8">
                        <TitlePriceReviews variant={currentVariant} />

                        <Colors
                            colors={availableColors}
                            selected={selectedColor}
                            onSelect={onColorSelect}
                        />

                        <Sizes
                            sizes={allSizes}
                            availableSizes={availableSizes}
                            selected={selectedSize}
                            onSelect={onSizeSelect}
                        />

                        <Buttons
                            onWishlistClick={handleWishlist}
                            isWishlisted={addedToWishlist}
                            // onAddToCart={handleAddToCart}
                            // disabled={!currentVariant}
                        />

                        <Description variant={defaultVariant} />
                        <FabricAndCare variant={defaultVariant} />
                    </aside>
                </section>
            </div>

            {/* Reviews Section */}
            <section className="flex flex-col w-full items-center gap-12">
                <h2 className="text-4xl font-medium">Reviews</h2>
                <ProductReviews product={defaultVariant.product} />
            </section>
        </div>
    );
}
