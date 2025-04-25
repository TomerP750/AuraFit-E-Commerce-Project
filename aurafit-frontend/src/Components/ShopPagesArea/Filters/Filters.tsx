import "./Filters.css";
import {JSX, useState} from "react";
import {FiChevronDown} from "react-icons/fi";


interface FiltersProps {
    onFilterClick: () => void
    showFilter: boolean
}
export function Filters({onFilterClick, showFilter}: FiltersProps): JSX.Element {

    const [arrowDown, setArrowDown] = useState(false);
    const [sortArrow, setSortArrow] = useState(false);


    return (
        <div className="min-w-60">
            <p onClick={onFilterClick}
               className={"my-2 text-xl flex items-center cursor-pointer sm:cursor-default gap-2"}>Filters</p>

            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
                <div className="flex items-center justify-between cursor-pointer" onClick={()=>setSortArrow(!sortArrow)}>
                <p className="mb-3 text-sm font-medium">Sort By</p>
                    <FiChevronDown className={`mb-3 mx-2 ${sortArrow ? "" : 'rotate-180'} transition duration-300`}/>
                </div>
                {sortArrow &&
                <div className="flex flex-col gap-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-light text-gray-700">
                        <input type="radio" name="sort" value="newest" className="accent-black"/>
                        Newest
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-light text-gray-700">
                        <input type="radio" name="sort" value="low-high" className="accent-black"/>
                        Low - High
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-light text-gray-700">
                        <input type="radio" name="sort" value="high-low" className="accent-black"/>
                        High - Low
                    </label>
                </div>}
            </div>


            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>

                <div className="flex items-center justify-between cursor-pointer" onClick={()=>setArrowDown(!arrowDown)}>
                    <p className="mb-3 text-sm font-medium">Categories</p>
                    <FiChevronDown className={`mb-3 mx-2 ${arrowDown ? "" : 'rotate-180'} transition duration-300`}/>
                </div>

                {arrowDown &&
                <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                    <p className="flex gap-2">
                        <input type="checkbox" className={"w-3"} value={"All"}/>All
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" className={"w-3"} value={"Women"}/>Option 1
                    </p>
                    <p className="flex gap-2">
                        <input type="checkbox" className={"w-3"} value={"Women"}/>Option 2
                    </p>
                </div>}
            </div>

        </div>
    );
}
