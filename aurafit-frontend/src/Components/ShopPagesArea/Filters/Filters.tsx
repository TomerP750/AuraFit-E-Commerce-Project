import "./Filters.css";
import {JSX, useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";


type SortOption = 'newest'|'high-low'|'low-high';
interface FiltersProps {
    onFilterClick: () => void
    sortSelected: SortOption
    onSortSelected: (value: SortOption) => void;
    showFilter: boolean
}

export function Filters({onFilterClick, sortSelected, onSortSelected ,showFilter}: FiltersProps): JSX.Element {

    const [arrowDown, setArrowDown] = useState(false);
    const [sortArrow, setSortArrow] = useState(false);

    return (
        <>
            <div className="min-w-60">
                <p onClick={onFilterClick} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                    <FiChevronDown className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>
                </p>

                {/*Sorts*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className={"mb-3 text-sm font-medium"}>SORT BY</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700 accent-black"}>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} checked={sortSelected === 'newest'} onChange={()=>onSortSelected('newest')} name={"sortBy"} type="radio" value={'newest'}/> Newest
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} checked={sortSelected === 'high-low'} onChange={()=>onSortSelected('high-low')} name={"sortBy"} type="radio" value={'high-low'}/> High - Low
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} checked={sortSelected === 'low-high'} onChange={()=>onSortSelected('low-high')} name={"sortBy"} type="radio" value={'low-high'}/> Low - High
                        </p>
                    </div>
                </div>


                {/*    category filter*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className={"mb-3 text-sm font-medium"}>CATEGORIES</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700 accent-black"}>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION1'}/> OPTION 1
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION2'}/> OPTION 1
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION3'}/> OPTION 1
                        </p>
                    </div>
                </div>
                {/*    SUBCATEGORY FILTER*/}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className={"mb-3 text-sm font-medium"}>TYPE</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700 accent-black"}>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION1'}/> TSHIRTS
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION2'}/> HOODIES
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type="checkbox" value={'OPTION3'}/> SHORTS
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}
