import {JSX, useEffect, useMemo, useState} from "react";
import "./Women.css";
import {FiFilter} from "react-icons/fi";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../Product-Area/ProductCard/ProductCard.tsx";
import displayService from "../../../Services/DisplayService.ts";
import {toast} from "react-toastify";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
import {Gender} from "../../../Models/Enums/Gender.ts";
import {sortGroupedVariants} from "../../../Utils/FiltersUtils.ts";
import wishlistService from "../../../Services/WishlistService.ts";


type SortOption = 'newest'|'high-low'|'low-high';
export function Women(): JSX.Element {
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

    // cards: one per product-color combination
    const [cards, setCards] = useState<{
        variants: ProductVariant[];
    }[]>([]);

    useEffect(() => {
        displayService
            .allClothingByGender(Gender.WOMEN)
            .then((res: ProductVariant[]) => {
                // group by product ID
                const byProduct = res.reduce<Record<number, ProductVariant[]>>((acc, v) => {
                    const pid = v.product.id;
                    if (!acc[pid]) acc[pid] = [];
                    acc[pid].push(v);
                    return acc;
                }, {});

                // for each product, group by color ID
                const grouped: { variants: ProductVariant[] }[] = [];
                Object.values(byProduct).forEach((productVariants) => {
                    const byColor = productVariants.reduce<Record<number, ProductVariant[]>>(
                        (acc, v) => {
                            const cid = v.color.id;
                            if (!acc[cid]) acc[cid] = [];
                            acc[cid].push(v);
                            return acc;
                        },
                        {}
                    );
                    Object.values(byColor).forEach((colorVariants) => {
                        grouped.push({ variants: colorVariants });
                    });
                });

                setCards(grouped);
            })
            .catch((err) => toast.error(err));
    }, []);

    const sortedCards = useMemo(
        () => sortGroupedVariants(cards, sortOption),
        [cards, sortOption]
    );

    const handleAddToWishlist = (id: number)=> {
        wishlistService.addProductToWishlist(id)
            .then(()=>toast.success("Added to Wishlist"))
            .catch((err) => toast.error(err));
    }

    return (
        <div className="container mx-auto px-4 pt-10">
            {/* Mobile: filter toggle */}
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"
                onClick={() => setShowFilters((p) => !p)}
            >
                <FiFilter /> Filters
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
                <aside
                    className={`w-full sm:w-60 transition-all duration-200 ${
                        showFilters ? "block" : "hidden"
                    } sm:block`}
                >
                    <Filters sortSelected={sortOption}
                             onSortSelected={setSortOption}
                             selectedCategories={selectedCategories}
                             onCategoryToggle={id => {
                                 setSelectedCategories(cs =>
                                     cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]
                                 );
                             }}

                             selectedTypes={selectedTypes}
                             onTypeToggle={id => {
                                 setSelectedTypes(ts =>
                                     ts.includes(id) ? ts.filter(x => x !== id) : [...ts, id]
                                 );
                             }}

                             selectedColors={selectedColors}
                             onColorToggle={id => {
                                 setSelectedColors(cs =>
                                     cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]
                                 );
                             }}

                             selectedSizes={selectedSizes}
                             onSizeToggle={id => {
                                 setSelectedSizes(ss =>
                                     ss.includes(id) ? ss.filter(x => x !== id) : [...ss, id]
                                 );
                             }}

                    />
                </aside>

                <main className="flex-1">
                    <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedCards.map(({ variants }) => (
                            <ProductCard
                                key={variants[0].id}
                                variants={variants}
                                onAddToWishlist={handleAddToWishlist}
                                selectedVariantId={variants[0].id}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
