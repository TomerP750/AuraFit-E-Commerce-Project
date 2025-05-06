import "./Men.css";
import {JSX, useEffect, useState} from "react";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../ProductCard/ProductCard.tsx";
import {Product} from "../../../Models/Product.ts";


type SortOption = 'newest'|'high-low'|'low-high';

export function Men(): JSX.Element {


    const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProduct, setFilterProducts] = useState([]);
    const [sortBy, setSortBy] = useState<SortOption>('newest');


    // useEffect(() => {
    //
    // }, []);

    return (
        <div className="w-full flex flex-col sm:flex-row pt-10 px-4 mx-auto gap-2">
            <aside className="w-full sm:w-1/6 flex-shrink-0">
            <div className="">
                <Filters onFilterClick={() => setShowFilter(!showFilter)} showFilter={showFilter} onSortSelected={setSortBy} sortSelected={sortBy} />
            </div>
            </aside>
            <main className="w-full sm:w-5/6 pl-4 pr-6">
                <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
                <div className="grid grid-cols-1 min-w-[1495px]:grid-cols-2 lg:grid-cols-3 justify-items-center lg:gap-0 md:gap-4">
                    {/*{products.map(p => <ProductCard key={p.id} product={p}/>)}*/}
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </main>
        </div>


        //
        // <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        //     <Filters onFilterClick={() => setShowFilter(!showFilter)} showFilter={showFilter}/>
        //     {/*    Right Side*/}
        //     <div className="flex-1">
        //
        //         <div className="flex justify-between text-base sm:text-2xl mb-4">
        //             <p className={"text-3xl"}>Men</p>
        //             {/*product sort*/}
        //             <select className="border-2 border-gray-300 text-sm px-2">
        //                 <option value="newest">Newest</option>
        //                 <option value="low-high">Low - High</option>
        //                 <option value="high-low">High - Low</option>
        //             </select>
        //         </div>
        //
        //         {/*    Map Products*/}
        //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
        //             {/*{products.map(pv => <ProductCard key={pv.id} variant={pv}/>)}*/}
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //             <ProductCard/>
        //         </div>
        //     </div>
        // </div>


    );
}
