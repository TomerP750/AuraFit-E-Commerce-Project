import "./Filters.css";
import {JSX, useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";


interface FiltersProps {
    onFilterClick: () => void
    showFilter: boolean
}
export function Filters({onFilterClick, showFilter}: FiltersProps): JSX.Element {

    const [arrowDown, setArrowDown] = useState(false);
    const [sortArrow, setSortArrow] = useState(false);


    return (
        <div className="w-60">
            <p onClick={onFilterClick}
               className={"my-2 text-xl flex items-center cursor-pointer sm:cursor-default gap-2"}>Filters</p>

            <div className={`border-b border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
                <div className="flex items-center justify-between cursor-pointer" onClick={()=>setSortArrow(!sortArrow)}>
                <p className="mb-3 text-sm font-medium">Sort By</p>
                    <FiChevronDown className={`mb-3 mx-2 ${sortArrow ? "" : 'rotate-180'} transition duration-300`}/>
                </div>
                <AnimatePresence initial={false}>
                    {sortArrow && (
                        <motion.div
                            key="sortOptions"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <div className="flex flex-col gap-2 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer font-light text-gray-700">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="newest"
                                        className="accent-black"
                                        defaultChecked={true}
                                    />
                                    Newest
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-light text-gray-700">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="low-high"
                                        className="accent-black"
                                    />
                                    Low – High
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-light text-gray-700">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="high-low"
                                        className="accent-black"
                                    />
                                    High – Low
                                </label>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <div className={`border-b border-gray-300 pl-5 py-3 ${showFilter ? 'block' : 'hidden'} sm:block`}>

                <div className="flex items-center justify-between cursor-pointer" onClick={()=>setArrowDown(!arrowDown)}>
                    <p className="mb-3 text-sm font-medium">Categories</p>
                    <FiChevronDown className={`mb-3 mx-2 ${arrowDown ? "" : 'rotate-180'} transition duration-300`}/>
                </div>

                <AnimatePresence initial={false}>
                    {arrowDown && (
                        <motion.div
                            key="categories"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="py-2 flex flex-col gap-2 text-sm font-light text-gray-700">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-3 accent-black"/> All
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-3 accent-black"/> Option 1
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-3 accent-black"/> Option 2
                                </label>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
