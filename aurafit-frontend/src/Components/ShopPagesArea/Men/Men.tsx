import "./Men.css";
import {JSX, use, useEffect, useState} from "react";
import {Filters} from "../Filters/Filters.tsx";
import {ProductCard} from "../../ProductCard/ProductCard.tsx";




export function Men(): JSX.Element {

    const products = ([
        { id: 1, name: "Slim Fit Shirt", price: 29.99 },
        { id: 2, name: "Classic Jeans",    price: 49.99},
        { id: 3, name: "Sneakers",         price: 69.99 },
        { id: 4, name: "Leather Jacket",   price:109.99},
        { id: 5, name: "Hat", price: 19.99 },
        { id: 6, name: "Watch", price: 199.99 },
    ]);

    // const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProduct, setFilterProducts] = useState([]);
    //
    // useEffect(() => {
    //     setFilterProducts()
    // }, []);

    return (
        <div className="w-full flex flex-col sm:flex-row pt-10 px-4 mx-auto gap-2">
            <aside className="w-full sm:w-1/6 flex-shrink-0">
                <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                    <Filters onFilterClick={() => setShowFilter(!showFilter)} showFilter={showFilter}/>
                </div>
            </aside>
            <main className="w-full sm:w-5/6 pl-4 pr-6">
                <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                    {products.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
            </main>
        </div>
    );
}
