// src/components/Filters/Filters.tsx
import { JSX } from "react";
import "./Filters.css";


interface FiltersProps {
    
}

export function Filters({}: FiltersProps): JSX.Element {
    

    return (
        <main className="w-full sm:w-60 px-4 py-6 border-r border-gray-200 text-left">
            {/* SORT BY */}
            {/* <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setSortOpen(o => !o)}
                >
                    <span>Sort By</span>
                    {sortOpen ? <BiMinus /> : <BiPlus />}
                </div>
                {sortOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {(["newest", "high-low", "low-high"] as SortOption[]).map(opt => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="w-4 h-4 accent-black"
                                   
                                />
                                {opt === "newest"
                                    ? "Newest"
                                    : opt === "high-low"
                                        ? "High – Low"
                                        : "Low – High"}
                            </label>
                        ))}
                    </div>
                )}
            </div> */}
            <hr className="border-t border-gray-200 my-4"/>

            {/* CATEGORIES */}
            {/* <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setCatOpen(o => !o)}
                >
                    <span>Categories</span>
                    {catOpen ? <BiMinus /> : <BiPlus />}
                </div>
                {catOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {categories.map(cat => (
                            <label key={cat.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    checked={selectedCategories.includes(cat.id)}
                                    onChange={() => onCategoryToggle(cat.id)}
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                )}
            </div> */}
            <hr className="border-t border-gray-200 my-4"/>

            {/* TYPE */}
            {/* <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setTypeOpen(o => !o)}
                >
                    <span>Type</span>
                    {typeOpen ? <BiMinus /> : <BiPlus />}
                </div>
                {typeOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {productTypes.map(type => (
                            <label key={type.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    checked={selectedTypes.includes(type.id)}
                                    onChange={() => onTypeToggle(type.id)}
                                />
                                {type.name}
                            </label>
                        ))}
                    </div>
                )}
            </div> */}
            <hr className="border-t border-gray-200 my-4"/>

            {/*/!* SIZE *!/*/}
            {/* <div className="mb-4">*/}
            {/*    <div*/}
            {/*        className="flex justify-between items-center cursor-pointer font-medium text-sm"*/}
            {/*        onClick={() => setSizeOpen(o => !o)}*/}
            {/*    >*/}
            {/*        <span>Size</span>*/}
            {/*        {sizeOpen ? <BiMinus /> : <BiPlus />}*/}
            {/*    </div>*/}
            {/*    {sizeOpen && (*/}
            {/*        <div className="mt-4 space-y-3 text-sm">*/}
            {/*            {sizes.map(sz => (*/}
            {/*                <label key={sz.id} className="flex items-center gap-2">*/}
            {/*                    <input*/}
            {/*                        type="checkbox"*/}
            {/*                        className="w-4 h-4 accent-black"*/}
            {/*                        checked={selectedSizes.includes(sz.id)}*/}
            {/*                        onChange={() => onSizeToggle(sz.id)}*/}
            {/*                    />*/}
            {/*                    {sz.size}*/}
            {/*                </label>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div> */}
            <hr className="border-t border-gray-200 my-4"/>

            {/* COLOR */}
            {/* <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setColorOpen(o => !o)}
                >
                    <span>Color</span>
                    {colorOpen ? <BiMinus /> : <BiPlus />}
                </div>
                {colorOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {colors.map(col => (
                            <label key={col.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    checked={selectedColors.includes(col.id)}
                                    onChange={() => onColorToggle(col.id)}
                                />
                                {col.color}
                            </label>
                        ))}
                    </div>
                )}
            </div> */}
        </main>
    );
}
