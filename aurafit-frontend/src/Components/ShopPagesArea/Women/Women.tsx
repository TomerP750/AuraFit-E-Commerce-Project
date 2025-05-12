import {JSX, useEffect, useState} from "react";
import "./Women.css";
import {FiFilter} from "react-icons/fi";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../Product-Area/ProductCard/ProductCard.tsx";
import displayService from "../../../Services/DisplayService.ts";
import {toast} from "react-toastify";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
import {Gender} from "../../../Models/Enums/Gender.ts";


type SortOption = 'newest'|'high-low'|'low-high';
export function Women(): JSX.Element {
    const [products, setProducts] = useState<ProductVariant[]>([]);
    // const [showFilter, setShowFilter] = useState(true);
    // const [filterProduct, setFilterProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');


    useEffect(() => {
        displayService.allClothingByGender(Gender.WOMEN)
            .then(res => setProducts(res))
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
                    <h2 className="text-2xl font-medium mb-6">Women’s Collection</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(p => <ProductCard key={p.id} variant={p} />)}
                    </div>
                </main>
            </div>
        </div>
    );
}
