import "./Men.css";
import {JSX, useEffect, useState} from "react";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../ProductCard/ProductCard.tsx";
import {Product} from "../../../Models/Product.ts";
import {FiFilter} from "react-icons/fi";


type SortOption = 'newest'|'high-low'|'low-high';

export function Men(): JSX.Element {


    // const [products, setProducts] = useState([]);
    // const [showFilter, setShowFilter] = useState(true);
    // const [filterProduct, setFilterProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');


    // useEffect(() => {
    //
    // }, []);

    // return (
    //     <div className="w-full flex flex-col sm:flex-row pt-10 px-4 mx-auto gap-2">
    //         <aside className="w-full sm:w-1/6 flex-shrink-0">
    //         <div className="">
    //             <Filters onFilterClick={() => setShowFilter(!showFilter)} showFilter={showFilter} onSortSelected={setSortBy} sortSelected={sortBy} />
    //         </div>
    //         </aside>
    //         <main className="w-full sm:w-5/6 pl-4 pr-6">
    //             <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
    //             <div className="grid grid-cols-1 min-w-[1495px]:grid-cols-2 lg:grid-cols-3 justify-items-center lg:gap-0 md:gap-4">
    //                 {/*{products.map(p => <ProductCard key={p.id} product={p}/>)}*/}
    //                 <ProductCard/>
    //                 <ProductCard/>
    //                 <ProductCard/>
    //                 <ProductCard/>
    //                 <ProductCard/>
    //                 <ProductCard/>
    //                 <ProductCard/>
    //             </div>
    //         </main>
    //     </div>
    //
    // );

    return (
        <div className="px-4 pt-10 mx-auto">
            {/* Mobile filter toggle */}
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"
                onClick={() => setShowFilters((p) => !p)}
            >
                <FiFilter /> Filters
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
                <aside
                    className={`transition-all duration-200 ${
                        showFilters ? "h-auto" : "h-0 overflow-hidden"
                    } sm:h-auto sm:block`}
                >
                    <Filters sortSelected={sortBy} onSortSelected={setSortBy}/>
                </aside>
                <main className="flex-1">
                    <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => (
                            <ProductCard key={i}/>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
