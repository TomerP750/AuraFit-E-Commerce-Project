// src/components/Filters/Filters.tsx
import "./Filters.css";
import { JSX, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Category } from "../../../Models/Category";
import { ProductType } from "../../../Models/ProductType";
import { Color } from "../../../Models/Color";
import { Size } from "../../../Models/Size";

export type SortOption = "newest" | "high-low" | "low-high";

interface FiltersProps {
    sortSelected: SortOption;
    onSortSelected: (value: SortOption) => void;

    categories: Category[];
    selectedCategories: number[];
    onCategoryToggle: (id: number) => void;

    productTypes: ProductType[];
    selectedTypes: number[];
    onTypeToggle: (id: number) => void;

    sizes: Size[];
    selectedSizes: number[];
    onSizeToggle: (id: number) => void;

    colors: Color[];
    selectedColors: number[];
    onColorToggle: (id: number) => void;
}

export function Filters({
                            sortSelected,
                            onSortSelected,

                            categories,
                            selectedCategories,
                            onCategoryToggle,

                            productTypes,
                            selectedTypes,
                            onTypeToggle,

                            sizes,
                            selectedSizes,
                            onSizeToggle,

                            colors,
                            selectedColors,
                            onColorToggle,
                        }: FiltersProps): JSX.Element {
    const [sortOpen, setSortOpen] = useState(true);
    const [catOpen, setCatOpen] = useState(true);
    const [typeOpen, setTypeOpen] = useState(true);
    const [sizeOpen, setSizeOpen] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);

    return (
        <div className="w-full sm:w-60 px-4 py-6 border-r border-gray-200 text-left">
            {/* SORT BY */}
            <div className="mb-4">
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
                                    checked={sortSelected === opt}
                                    onChange={() => onSortSelected(opt)}
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
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* CATEGORIES */}
            <div className="mb-4">
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
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* TYPE */}
            <div className="mb-4">
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
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* SIZE */}
            <div className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setSizeOpen(o => !o)}
                >
                    <span>Size</span>
                    {sizeOpen ? <BiMinus /> : <BiPlus />}
                </div>
                {sizeOpen && (
                    <div className="mt-4 space-y-3 text-sm">
                        {sizes.map(sz => (
                            <label key={sz.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-black"
                                    checked={selectedSizes.includes(sz.id)}
                                    onChange={() => onSizeToggle(sz.id)}
                                />
                                {sz.size}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <hr className="border-t border-gray-200 my-4"/>

            {/* COLOR */}
            <div className="mb-4">
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
            </div>
        </div>
    );
}
