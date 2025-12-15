import { JSX, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddToCartRequestDTO } from "../../../../../Models/DTOS/AddToCartRequestDTO";
import { ProductVariant } from "../../../../../Models/ProductVariant";
import { increment } from "../../../../../Redux/CartSlice";
import { useUserSelector } from "../../../../../Redux/hooks";
import cartService from "../../../../../Services/CartService";
import displayService from "../../../../../Services/DisplayService";
import wishlistService from "../../../../../Services/WishlistService";
import { ProductReviews } from "../../../ProductReviews/ProductReviews";
import { Buttons } from "../../components/Buttons/Buttons";
import { Colors } from "../../components/Colors/Colors";
import { Description } from "../../components/Description/Description";
import { FabricAndCare } from "../../components/FabricAndCare/FabricAndCare";
import { Images } from "../../components/Images/Images";
import { Sizes } from "../../components/Sizes/Sizes";
import { TitlePriceReviews } from "../../components/TitlePriceReviews/TitlePriceReviews";
import { PageNotFound } from "../../../../PageNotFound/PageNotFound";

export function ProductPage(): JSX.Element {

    const { id, variantId } = useParams<Params>();
    const productId = Number(id);
    const selectedVariantId = variantId ? Number(variantId) : undefined;

    const navigate = useNavigate();
    const user = useUserSelector(s => s.authSlice.user);
    const dispatch = useDispatch();

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [loading, setLoading] = useState(true);
    const [addedToWishlist, setAddedToWishlist] = useState(false);

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
        if (selectedVariantId == null) {
            navigate(`/product/${productId}/${variants[0].id}`, { replace: true });
        }
    }, [variants, selectedVariantId, productId, navigate]);

    const selectedVariant = (() => {
        if (!variants.length) return null;
        return variants.find(v => v.id === selectedVariantId) ?? variants[0];
    })();

    useEffect(() => {
        if (!user) return;
        if (!selectedVariant) return;

        wishlistService
            .isOnWishlist(selectedVariant.product.id)
            .then(res => setAddedToWishlist(res))
            .catch(err => toast.error(err.response?.data || err.message));
    }, [user, selectedVariant]);

    const handleAddToCart = () => {
        if (!selectedVariant) return;

        const dto = new AddToCartRequestDTO(selectedVariant.id, 1);

        const promise = user
            ? cartService.addToCart(dto)
            : cartService.addToGuestCart(dto);

        promise
            .then(() => dispatch(increment()))
            .catch(err => toast.error(err.response?.data || err.message));
    };

    if (loading) return <div className="text-center py-20">Loading product…</div>;
    if (!variants.length || !selectedVariant) return <PageNotFound/>

    const gender = selectedVariant.product.gender;
    const titleCase = gender.charAt(0) + gender.slice(1).toLowerCase();

    return (
        <main className="w-full flex flex-col items-center gap-30">
            <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
                <nav className="flex gap-2 text-gray-600">
                    <NavLink to="/">Home</NavLink>
                    <span>/</span>
                    <NavLink to={`/products/${gender.toLowerCase()}`}>{titleCase}</NavLink>
                    <span>/</span>
                    <span>{selectedVariant.product.name}</span>
                </nav>

                <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
                    <Images variant={selectedVariant} />

                    <aside className="flex-1 flex flex-col gap-8">
                        <TitlePriceReviews variant={selectedVariant} />

                        <Colors
                            selectedVariant={selectedVariant}
                            //   onSelect={onColorSelect}
                            variants={variants}
                        />

                        <Sizes
                            variants={variants}
                            selectedVariant={selectedVariant}
                            // onSelect={onSizeSelect}
                        />

                        <Buttons
                            onWishlist={() => {
                                if (!user) return navigate("/login");
                                wishlistService
                                    .toggleWishlist(selectedVariant.product.id)
                                    .then(res => {
                                        toast.success(res ? "Added to wishlist" : "Removed from wishlist");
                                        setAddedToWishlist(res);
                                    })
                                    .catch(err => toast.error(err.response?.data || err.message));
                            }}
                            addedToWishlist={addedToWishlist}
                            onAddToCart={handleAddToCart}
                            disabled={!selectedVariant}
                        />

                        <Description variant={selectedVariant} />
                        <FabricAndCare variant={selectedVariant} />
                    </aside>
                </section>
            </div>

            <section className="flex flex-col w-full items-center gap-12">
                <ProductReviews product={selectedVariant.product} />
            </section>
        </main>
    );
}
