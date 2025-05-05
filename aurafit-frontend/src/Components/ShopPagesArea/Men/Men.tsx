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
        <div className="w-full flex flex-col sm:flex-row pt-10 px-4 max-w-7xl mx-auto gap-8">
            {/* 20% sidebar */}
            <div className="w-full sm:w-1/5 flex-shrink-0">
                <Filters
                    onFilterClick={() => setShowFilter(!showFilter)}
                    showFilter={showFilter}
                />
            </div>

            {/* 80% main */}
            <div className="w-full sm:w-4/5">
                <h2 className="text-2xl font-medium mb-6">Men’s Collection</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
