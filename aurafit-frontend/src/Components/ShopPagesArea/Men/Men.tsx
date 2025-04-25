import "./Men.css";
import {JSX, use, useEffect, useState} from "react";
import {Filters} from "../Filters/Filters.tsx";
import {Sorts} from "../Sorts/Sorts.tsx";

export function Men(): JSX.Element {

    const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProduct, setFilterProducts] = useState([]);
    //
    // useEffect(() => {
    //     setFilterProducts()
    // }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
			<Filters onFilterClick={()=>setShowFilter(!showFilter)} showFilter={showFilter}/>
            <div className="flex-1">
                Men
            </div>
        {/*    The products*/}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-0">

            </div>
        </div>
    );
}
