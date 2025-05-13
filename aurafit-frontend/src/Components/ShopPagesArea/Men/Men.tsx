import "./Men.css";
import {JSX, useEffect, useState} from "react";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../Product-Area/ProductCard/ProductCard.tsx";
import {FiFilter} from "react-icons/fi";
import displayService from "../../../Services/DisplayService.ts";
import {toast} from "react-toastify";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
import {Gender} from "../../../Models/Enums/Gender.ts";


type SortOption = 'newest'|'high-low'|'low-high';

export function Men(): JSX.Element {


    // const [products, setProducts] = useState<ProductVariant[]>([]);
    // const [showFilter, setShowFilter] = useState(true);
    // const [filterProduct, setFilterProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    const [cards, setCards] = useState<{ productId: number; variants: ProductVariant[] }[]>([]);

    useEffect(() => {
        //TODO change to groupby lodash
        displayService.allClothingByGender(Gender.MEN)
            .then((res: ProductVariant[]) => {
                // Build a map from productId → Variant[]
                const map = res.reduce<Record<number, ProductVariant[]>>((acc, v) => {
                    const id = v.product.id;
                    if (!acc[id]) acc[id] = [];
                    acc[id].push(v);
                    return acc;
                }, {});

                // Convert to card shape
                const arr: {productId: number, variants: ProductVariant[]}[] = Object.values(map).map(variants => ({
                    productId: variants[0].product.id,
                    variants,
                }));

                setCards(arr);
            })

            .catch(err => toast.error(err));
    }, []);


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
                {/* Sidebar */}
                <aside
                    className={`w-full sm:w-60 transition-all duration-200 ${
                        showFilters ? "block" : "hidden"
                    } sm:block`}
                >
                    <Filters sortSelected={sortBy} onSortSelected={setSortBy} />
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/*{products.map((variant) => <ProductCard key={variant.id} variant={variant}  />)}*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cards.map(({productId, variants}) => (
                                <ProductCard key={productId} variants={variants}/>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
