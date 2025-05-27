// src/pages/Men.tsx
import {JSX, useEffect, useMemo, useState} from "react";
import "./Men.css";
import {Filters} from "../Filters/Filters";
import {ProductCard} from "../../Product-Area/ProductCard/ProductCard";
import {FiFilter} from "react-icons/fi";
import displayService from "../../../Services/DisplayService";
import {toast} from "react-toastify";

import {Gender} from "../../../Models/Enums/Gender";
import {sortVariants, SortOption} from "../../../Utils/FiltersUtils";
import {Category} from "../../../Models/Category";
import {ProductType} from "../../../Models/ProductType";
import {Color} from "../../../Models/Color";
import {Size} from "../../../Models/Size";
import {ProductVariantDTO} from "../../../Models/DTOS/ProductVariantDTO.ts";
import {ProductDTO} from "../../../Models/DTOS/ProductDTO.ts";

export function Men(): JSX.Element {
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>("newest");


    // filter options
    const [categories, setCategories] = useState<Category[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    // selected filters
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

    // one “card” per product + its own variants
    const [cards, setCards] = useState<{ product: ProductDTO; variants: ProductVariantDTO[] }[]>([]);

    // fetch metadata once
    useEffect(() => {
        displayService.allCategories().then(setCategories).catch(err => toast.error(err));
        displayService.allProductTypes().then(setProductTypes).catch(err => toast.error(err));
        displayService.allColors().then(setColors).catch(err => toast.error(err));
        displayService.allSizes().then(setSizes).catch(err => toast.error(err));
    }, []);

    // fetch only ProductDTO (which includes variants) and map to cards
    useEffect(() => {

        displayService.allProductsByGender(Gender.MEN)   // returns ProductDTO[]
            .then((products: ProductDTO[]) => {
                setCards(products.map(p => ({
                        product: p, variants: Array.isArray(p.variants) ? p.variants : [],
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
        const withSorted = filtered.map(c => {
            // run the sort
            const sortedVariants = sortVariants(c.variants, sortOption);

            // log whatever you like
            console.log(
                `Product ${c.product.id} sorted with option "${sortOption}":`,
                sortedVariants
            );

            // return your mapped shape
            return {
                product: c.product,
                variants: sortedVariants,
            };
        });

        withSorted.sort((a, b) => {
            const va = a.variants[0], vb = b.variants[0];

            if (a.variants.length < 1 || b.variants.length < 1) return 0;

            // if (!va || !vb) return 0;
            switch (sortOption) {
                case "high-low": {
                    console.log("vaafter", va)
                    return vb.basePrice - va.basePrice;
                }
                case "low-high": {
                    console.log("vaafter", va)
                    return va.basePrice - vb.basePrice;
                }
                case "newest":
                    return (
                        new Date(vb.createdAt).getTime() -
                        new Date(va.createdAt).getTime()
                    );
                default:
                    return 0;
            }
        });
        console.log("withSorted after sort: ", withSorted)

        return withSorted;
    }, [cards, sortOption, selectedCategories, selectedTypes, selectedColors, selectedSizes,]);


    return (
        <div className="container mx-auto px-4 pt-10">
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"
                onClick={() => setShowFilters(f => !f)}
            >
                <FiFilter/> Filters
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
                        {sortedCards.map(({product, variants}) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variants={variants}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}


