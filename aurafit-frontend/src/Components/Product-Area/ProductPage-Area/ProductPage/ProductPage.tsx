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
import cartService from "../../../../Services/CartService.ts";
import {AddToCartRequestDTO} from "../../../../Models/DTOS/AddToCartRequestDTO.ts";


type ProductCardData = {
    productId: number;
    variants: ProductVariant[];
};

export function ProductPage(): JSX.Element {
    const { id } = useParams();
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

    useEffect(() => {
        if (!variants.length) return;

        const defaultVariant = variants[0];

        setSelectedColor(defaultVariant.color);
    }, [variants]);

    if (loading) {
        return <div className="text-center py-20">Loading product…</div>;
    }

    if (variants.length === 0) {
        return <div className="text-center py-20">No product variants found.</div>;
    }

    const defaultVariant = variants[0];

    const availableColors = variants.reduce<Color[]>((acc, v) => {
        if (!acc.find(c => c.id === v.color.id)) {
            acc.push(v.color);
        }
        return acc;
    }, []);


    const availableSizes = selectedColor
        ? variants
            .filter(v => v.color.id === selectedColor.id)
            .map(v => v.size)
        : [];


    const currentVariant = (() => {
        if (selectedColor) {
            const colorGroup = variants.filter(v => v.color.id === selectedColor.id);
            // if the user has also picked a size, find that one
            if (selectedSize) {
                return (
                    colorGroup.find(v => v.size.id === selectedSize.id)
                    // fallback to the first size of that color
                    || colorGroup[0]
                );
            }
            // no size yet → just grab the first variant of that color
            return colorGroup[0];
        }
        // no color yet → use your original default
        return defaultVariant;
    })();

    // Handlers
    const onColorSelect = (color: Color) => {
        const canon = variants.find(v => v.color.id === color.id)!.color;
        setSelectedColor(canon);
        // reset the size; DON’T auto-pick anything here
        setSelectedSize(null);
    };

    const onSizeSelect = (size: Size) => {
        setSelectedSize(size);
    };

    const handleWishlist = () => setAddedToWishlist(prev => !prev);
    const handleAddToCart = () => {

        const dto = new AddToCartRequestDTO(currentVariant.id, 1);

        cartService.addToCart(dto)
            .then(() => toast.success("Added to cart"))
            .catch(err => toast.error(err.response.data));

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
                            onWishlist={handleWishlist}
                            isWishlisted={addedToWishlist}
                            onAddToCart={handleAddToCart}
                            disabled={!currentVariant}
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
