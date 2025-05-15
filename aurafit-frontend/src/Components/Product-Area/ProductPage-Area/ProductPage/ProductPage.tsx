import "./ProductPage.css";
import { JSX, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { TitlePriceReviews } from "../TitlePriceReviews/TitlePriceReviews.tsx";
import { Colors } from "../Colors/Colors.tsx";
import { Sizes } from "../Sizes/Sizes.tsx";
import { Description } from "../Description/Description.tsx";
import { Buttons } from "../Buttons/Buttons.tsx";
import { FabricAndCare } from "../FabricAndCare/FabricAndCare.tsx";
import { Images } from "../Images/Images.tsx";
import { ProductReviews } from "../../ProductReviews/ProductReviews.tsx";
import { toast } from "react-toastify";
import { ProductVariant } from "../../../../Models/ProductVariant.ts";
import displayService from "../../../../Services/DisplayService.ts";
import { Size } from "../../../../Models/Size.ts";
import { Color } from "../../../../Models/Color.ts";
import cartService from "../../../../Services/CartService.ts";
import { AddToCartRequestDTO } from "../../../../Models/DTOS/AddToCartRequestDTO.ts";
import wishlistService from "../../../../Services/WishlistService.ts";

export function ProductPage(): JSX.Element {
    const { id } = useParams();
    const productId = Number(id);

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [allSizes, setAllSizes] = useState<Size[]>([]);
    const [sizeError, setSizeError] = useState(false);

    // Fetch all variants for this product
    useEffect(() => {
        setLoading(true);
        displayService.allVariantsByProductId(productId)
            .then((res) => setVariants(res))
            .catch((err) => toast.error(err.response.data))
            .finally(() => setLoading(false));
    }, [productId]);

    // Fetch list of sizes for this product's type
    useEffect(() => {
        if (!variants.length) return;
        const productTypeId = variants[0].product.productType.id;
        displayService.allSizesByProductType(productTypeId)
            .then((res) => setAllSizes(res))
            .catch((err) => toast.error(err.response.data));
    }, [variants]);

    // Default to first color
    useEffect(() => {
        if (!variants.length) return;
        setSelectedColor(variants[0].color);
        setSelectedSize(null);
    }, [variants]);

    if (loading) {
        return <div className="text-center py-20">Loading product…</div>;
    }

    if (!variants.length) {
        return <div className="text-center py-20">No product variants found.</div>;
    }

    const defaultVariant = variants[0];

    // Unique colors available
    const availableColors = variants.reduce<Color[]>((acc, v) => {
        if (!acc.find((c) => c.id === v.color.id)) {
            acc.push(v.color);
        }
        return acc;
    }, []);

    // Sizes for the selected color only
    const availableSizes = selectedColor
        ? variants
            .filter((v) => v.color.id === selectedColor.id)
            .map((v) => v.size)
        : [];

    // Only a "current" variant when both color & size are chosen
    const currentVariant: ProductVariant | null = selectedColor && selectedSize ?
            variants.find(
                (v) =>
                    v.color.id === selectedColor.id &&
                    v.size.id === selectedSize.id
            ) ?? null
            : null;

    // Handlers
    const onColorSelect = (color: Color) => {
        const canon = variants.find((v) => v.color.id === color.id)!.color;
        setSelectedColor(canon);
        setSelectedSize(null);
        setSizeError(false);
    };

    const onSizeSelect = (size: Size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    const handleWishlist = (variantId: number) => {

        if (!addedToWishlist) {

            wishlistService.addProductToWishlist(variantId)
                .then(() => {
                    toast.success("Added to wishlist");
                    setAddedToWishlist(true);
                })
                .catch((err) => {
                    toast.error(err.response?.data || "Failed to add");
                });
        } else {
            wishlistService.deleteProductFromWishlist(variantId)
                .then(() => {
                    toast.success("Removed from wishlist");
                    setAddedToWishlist(false);
                })
                .catch((err) => {
                    toast.error(err.response?.data || "Failed to remove");
                });
        }
    };

    const handleAddToCart = () => {
        if (!currentVariant) {
            setSizeError(true);
            return;
        }
        setSizeError(false);
        const dto = new AddToCartRequestDTO(currentVariant.id, 1);
        cartService.addToCart(dto)
            .then(() => toast.success("Added to cart"))
            .catch((err) => toast.error(err.response.data));
        console.log("Adding to cart:", currentVariant);
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
                    {/* Left: Images gallery for the selected or default variant */}
                    <Images/>

                    {/* Right: Details and controls */}
                    <aside className="flex-1 flex flex-col gap-8">
                        <TitlePriceReviews
                            variant={currentVariant ?? defaultVariant}
                        />

                        <Colors
                            colors={availableColors}
                            selected={selectedColor}
                            onSelect={onColorSelect}
                        />

                        {/* Size selector with error styling only after failed add-to-cart */}
                        <div
                            className={`w-full ${
                                sizeError ? "border border-red-500 rounded p-2" : ""
                            }`}
                        >
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
                            onWishlist={() => {
                                if (!currentVariant) {
                                    setSizeError(true);
                                    return;
                                }
                                handleWishlist(currentVariant.id);
                            }}
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
