import "./Filters.css";
import {JSX, useEffect, useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";
import {BiMinus, BiPlus} from "react-icons/bi";
import {Category} from "../../../Models/Category.ts";
import {SubCategory} from "../../../Models/SubCategory.ts";


type SortOption = 'newest'|'high-low'|'low-high';
interface FiltersProps {
    // onFilterClick: () => void
    // sortSelected: SortOption
    // onSortSelected: (value: SortOption) => void;
    // showFilter: boolean

    sortSelected: SortOption;
    onSortSelected: (value: SortOption) => void
}

export function Filters({sortSelected, onSortSelected}: FiltersProps): JSX.Element {

    const [sortOpen, setSortOpen] = useState(true);
    const [catOpen, setCatOpen] = useState(true);
    const [typeOpen, setTypeOpen] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    // TODO set the categories and subcategories and replace the .map hardcoded string arrays
    useEffect(() => {

    }, [])

    return (
        <div className="w-full sm:w-70 px-4 py-6 border-r border-gray-200 text-left">
            {/* SORT BY */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setSortOpen((o) => !o)}
                >
                    <span>Sort By</span>
                    {sortOpen ? <BiMinus/> : <BiPlus/>}
                </div>
                {sortOpen && (
                    <div className=" mt-4 space-y-3 text-sm">
                        {(["newest", "high-low", "low-high"] as SortOption[]).map(
                            (opt) => (
                                <label key={opt} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="sort"
                                        className="w-4 h-4 accent-black"
                                        checked={sortSelected === opt}
                                        onChange={() => onSortSelected(opt)}
                                    />
                                    {opt === "newest"
                                        ? "Newest"
                                        : opt === "high-low"
                                            ? "High – Low"
                                            : "Low – High"}
                                </label>
                            )
                        )}
                    </div>
                )}
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* CATEGORIES */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setCatOpen((o) => !o)}
                >
                    <span>Categories</span>
                    {catOpen ? <BiMinus/> : <BiPlus/>}
                </div>
                {catOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {["OPTION1", "OPTION2", "OPTION3"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    // onChange={() => {/* your handler */}}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* TYPE */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setTypeOpen((o) => !o)}
                >
                    <span>Type</span>
                    {typeOpen ? <BiMinus/> : <BiPlus/>}
                </div>
                {typeOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {["TSHIRTS", "HOODIES", "SHORTS"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    // onChange={() => {/* your handler */}}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <hr className="border-t border-gray-200 my-4"/>


            {/*    Size*/}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setTypeOpen((o) => !o)}
                >
                    <span>Size</span>
                    {typeOpen ? <BiMinus/> : <BiPlus/>}
                </div>
                {typeOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {["TSHIRTS", "HOODIES", "SHORTS"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    // onChange={() => {/* your handler */}}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <hr className="border-t border-gray-200 my-4"/>


            {/*    Colors*/}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setTypeOpen((o) => !o)}
                >
                    <span>Color</span>
                    {typeOpen ? <BiMinus/> : <BiPlus/>}
                </div>
                {typeOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {["TSHIRTS", "HOODIES", "SHORTS"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    // onChange={() => {/* your handler */}}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <hr className="border-t border-gray-200 my-4"/>


        </div>


    );
}
