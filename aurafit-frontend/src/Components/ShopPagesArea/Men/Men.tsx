// // src/pages/Men.tsx
// import "./Men.css";
// import {JSX, useEffect, useMemo, useState} from "react";
// import {Filters} from "../Filters/Filters.tsx";
// import {ProductCard} from "../../Product-Area/ProductCard/ProductCard.tsx";
// import {FiFilter} from "react-icons/fi";
// import displayService from "../../../Services/DisplayService.ts";
// import {toast} from "react-toastify";
// import {ProductVariant} from "../../../Models/ProductVariant.ts";
// import {Gender} from "../../../Models/Enums/Gender.ts";
// import {sortGroupedVariants, SortOption, sortVariants} from "../../../Utils/FiltersUtils.ts";
// import wishlistService from "../../../Services/WishlistService.ts";
// import {Color} from "../../../Models/Color.ts";
// import {Category} from "../../../Models/Category.ts";
// import {ProductType} from "../../../Models/ProductType.ts";
// import {Size} from "../../../Models/Size.ts";
//
// export function Men(): JSX.Element {
//     const [showFilters, setShowFilters] = useState(false);
//     const [sortOption, setSortOption] = useState<SortOption>("newest");
//
//     // ✅ All filter-options (empty at first)
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [productTypes, setProductTypes] = useState<ProductType[]>([]);
//     const [colors, setColors] = useState<Color[]>([]);
//     const [sizes, setSizes] = useState<Size[]>([]);
//
//     // ✅ Which IDs are currently selected
//     const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
//     const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
//     const [selectedColors, setSelectedColors] = useState<number[]>([]);
//     const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
//
//     // ✅ Your grouped cards
//     const [cards, setCards] = useState<{ variants: ProductVariant[] }[]>([]);
//     const [onWishlist, setOnWishlist] = useState(false);
//
//     // Fetch all filter-options once
//     useEffect(() => {
//         displayService.allCategories().then(setCategories).catch(err => toast.error(err));
//         displayService.allProductTypes().then(setProductTypes).catch(err => toast.error(err));
//         displayService.allColors().then(setColors).catch(err => toast.error(err));
//         displayService.allSizes().then(setSizes).catch(err => toast.error(err));
//     }, []);
//
//     // Fetch + group your variants
//     useEffect(() => {
//         displayService
//             .allClothingByGender(Gender.MEN)
//             .then((res: ProductVariant[]) => {
//                 const byProduct = res.reduce<Record<number, ProductVariant[]>>((acc, v) => {
//                     (acc[v.product.id] ??= []).push(v);
//                     return acc;
//                 }, {});
//                 const grouped: { variants: ProductVariant[] }[] = [];
//                 Object.values(byProduct).forEach(productVariants => {
//                     const byColor = productVariants.reduce<Record<number, ProductVariant[]>>((acc, v) => {
//                         (acc[v.color.id] ??= []).push(v);
//                         return acc;
//                     }, {});
//                     Object.values(byColor).forEach(colorVariants => grouped.push({ variants: colorVariants }));
//                 });
//                 setCards(grouped);
//             })
//             .catch(err => toast.error(err));
//     }, []);
//
//     // Apply filters + sorting
//     const sortedCards = useMemo(() => {
//         let filtered = cards;
//
//         if (selectedCategories.length)
//             filtered = filtered.filter(c => selectedCategories.includes(c.variants[0].product.category.id));
//         if (selectedTypes.length)
//             filtered = filtered.filter(c => selectedTypes.includes(c.variants[0].product.productType.id));
//         if (selectedColors.length)
//             filtered = filtered.filter(c => selectedColors.includes(c.variants[0].color.id));
//         if (selectedSizes.length)
//             filtered = filtered.filter(c => selectedSizes.includes(c.variants[0].size.id));
//
//         return sortGroupedVariants(filtered, sortOption);
//     }, [cards, sortOption, selectedCategories, selectedTypes, selectedColors, selectedSizes]);
//
//     const handleAddToWishlist = (productId: number) => {
//         wishlistService
//             .toggleWishlist(productId)
//             .then(res => {
//                 toast.success(onWishlist ? "Removed from wishlist" : "Added to wishlist");
//                 setOnWishlist(res);
//             })
//             .catch(err => toast.error(err));
//     };
//
//     // Toggle helpers
//     const handleCategoryToggle = (id: number) =>
//         setSelectedCategories(cs => (cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]));
//     const handleTypeToggle = (id: number) =>
//         setSelectedTypes(ts => (ts.includes(id) ? ts.filter(x => x !== id) : [...ts, id]));
//     const handleColorToggle = (id: number) =>
//         setSelectedColors(cs => (cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]));
//     const handleSizeToggle = (id: number) =>
//         setSelectedSizes(ss => (ss.includes(id) ? ss.filter(x => x !== id) : [...ss, id]));
//
//     return (
//         <div className="container mx-auto px-4 pt-10">
//             {/* mobile “Filters” toggle */}
//             <button
//                 className="flex items-center gap-2 mb-4 text-lg sm:hidden"
//                 onClick={() => setShowFilters(p => !p)}
//             >
//                 <FiFilter /> Filters
//             </button>
//
//             <div className="flex flex-col sm:flex-row gap-6">
//                 <aside className={`w-full sm:w-60 transition-all duration-200 ${showFilters ? "block" : "hidden"} sm:block`}>
//                     <Filters
//                         sortSelected={sortOption}
//                         onSortSelected={setSortOption}
//
//                         categories={categories}
//                         selectedCategories={selectedCategories}
//                         onCategoryToggle={handleCategoryToggle}
//
//                         productTypes={productTypes}
//                         selectedTypes={selectedTypes}
//                         onTypeToggle={handleTypeToggle}
//
//                         sizes={sizes}
//                         selectedSizes={selectedSizes}
//                         onSizeToggle={handleSizeToggle}
//
//                         colors={colors}
//                         selectedColors={selectedColors}
//                         onColorToggle={handleColorToggle}
//                     />
//                 </aside>
//
//                 <main className="flex-1">
//                     <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {sortedCards.map(({ variants }) => (
//                             <ProductCard
//                                 key={variants[0].id}
//                                 variants={variants}
//                                 onAddToWishlist={handleAddToWishlist}
//                                 selectedVariantId={variants[0].id}
//                             />
//                         ))}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }
//
//
//



// src/pages/Men.tsx
import { JSX, useEffect, useMemo, useState } from "react";
import "./Men.css";
import { Filters } from "../Filters/Filters";
import { ProductCard } from "../../Product-Area/ProductCard/ProductCard";
import { FiFilter } from "react-icons/fi";
import displayService from "../../../Services/DisplayService";
import wishlistService from "../../../Services/WishlistService";
import { toast } from "react-toastify";

import { Gender } from "../../../Models/Enums/Gender";
import { sortVariants, SortOption } from "../../../Utils/FiltersUtils";
import { Category } from "../../../Models/Category";
import { ProductType } from "../../../Models/ProductType";
import { Color } from "../../../Models/Color";
import { Size } from "../../../Models/Size";
import {ProductVariantDTO} from "../../../Models/DTOS/ProductVariantDTO.ts";
import {ProductDTO} from "../../../Models/DTOS/ProductDTO.ts";

export function Men(): JSX.Element {
    const [showFilters, setShowFilters]       = useState(false);
    const [sortOption, setSortOption]         = useState<SortOption>("newest");

    // filter options
    const [categories, setCategories]         = useState<Category[]>([]);
    const [productTypes, setProductTypes]     = useState<ProductType[]>([]);
    const [colors, setColors]                 = useState<Color[]>([]);
    const [sizes, setSizes]                   = useState<Size[]>([]);

    // selected filters
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTypes, setSelectedTypes]           = useState<number[]>([]);
    const [selectedColors, setSelectedColors]         = useState<number[]>([]);
    const [selectedSizes, setSelectedSizes]           = useState<number[]>([]);

    // one “card” per product + its own variants
    const [cards, setCards] = useState<
        { product: ProductDTO; variants: ProductVariantDTO[] }[]
    >([]);

    // fetch metadata once
    useEffect(() => {
        displayService.allCategories()   .then(setCategories)   .catch(err => toast.error(err));
        displayService.allProductTypes().then(setProductTypes).catch(err => toast.error(err));
        displayService.allColors()       .then(setColors)       .catch(err => toast.error(err));
        displayService.allSizes()        .then(setSizes)        .catch(err => toast.error(err));
    }, []);

    // fetch only ProductDTO (which includes variants) and map to cards
    useEffect(() => {
        displayService
            .allProductsByGender(Gender.MEN)   // returns ProductDTO[]
            .then((products: ProductDTO[]) => {
                setCards(
                    products.map(p => ({
                        product: p,
                        variants: Array.isArray(p.variants) ? p.variants : [],
                    }))
                );
            })
            .catch(err => toast.error(err));
    }, []);

    // apply filters & sort
    const sortedCards = useMemo(() => {
        let filtered = cards;

        if (selectedCategories.length) {
            filtered = filtered.filter(c =>
                selectedCategories.includes(c.product.category.id)
            );
        }
        if (selectedTypes.length) {
            filtered = filtered.filter(c =>
                selectedTypes.includes(c.product.productType.id)
            );
        }
        if (selectedColors.length) {
            filtered = filtered.filter(c =>
                c.variants.some(v => selectedColors.includes(v.color.id))
            );
        }
        if (selectedSizes.length) {
            filtered = filtered.filter(c =>
                c.variants.some(v => selectedSizes.includes(v.size.id))
            );
        }

        // sort each product’s variants
        const withSorted = filtered.map(c => ({
            product: c.product,
            variants: sortVariants(c.variants, sortOption),
        }));

        // then sort products by their first variant
        withSorted.sort((a, b) => {
            const va = a.variants[0], vb = b.variants[0];
            if (!va || !vb) return 0;
            switch (sortOption) {
                case "high-low": return vb.basePrice - va.basePrice;
                case "low-high": return va.basePrice - vb.basePrice;
                case "newest":
                    return (
                        new Date(vb.createdAt).getTime() -
                        new Date(va.createdAt).getTime()
                    );
                default:
                    return 0;
            }
        });

        return withSorted;
    }, [
        cards,
        sortOption,
        selectedCategories,
        selectedTypes,
        selectedColors,
        selectedSizes,
    ]);

    // wishlist toggle
    const handleAddToWishlist = (productId: number) => {
        wishlistService
            .toggleWishlist(productId)
            .then(() => toast.success("Wishlist updated"))
            .catch(err => toast.error(err));
    };

    return (
        <div className="container mx-auto px-4 pt-10">
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"
                onClick={() => setShowFilters(f => !f)}
            >
                <FiFilter /> Filters
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
                <aside className={`w-full sm:w-60 ${showFilters ? "block" : "hidden"} sm:block`}>
                    <Filters
                        sortSelected={sortOption}
                        onSortSelected={setSortOption}

                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoryToggle={id =>
                            setSelectedCategories(cs =>
                                cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]
                            )
                        }

                        productTypes={productTypes}
                        selectedTypes={selectedTypes}
                        onTypeToggle={id =>
                            setSelectedTypes(ts =>
                                ts.includes(id) ? ts.filter(x => x !== id) : [...ts, id]
                            )
                        }

                        colors={colors}
                        selectedColors={selectedColors}
                        onColorToggle={id =>
                            setSelectedColors(cs =>
                                cs.includes(id) ? cs.filter(x => x !== id) : [...cs, id]
                            )
                        }

                        sizes={sizes}
                        selectedSizes={selectedSizes}
                        onSizeToggle={id =>
                            setSelectedSizes(ss =>
                                ss.includes(id) ? ss.filter(x => x !== id) : [...ss, id]
                            )
                        }
                    />
                </aside>

                <main className="flex-1">
                    <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedCards.map(({ product, variants }) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variants={variants}
                                onAddToWishlist={handleAddToWishlist}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}


