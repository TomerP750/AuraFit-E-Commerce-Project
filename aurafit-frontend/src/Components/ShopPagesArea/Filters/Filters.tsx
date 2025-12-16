import { JSX, useState } from "react";
import "./Filters.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import { SortOption } from "../ShoppingList";


interface FiltersProps {

    sizes: { id: number; size: string }[];
    colors: { id: number; color: string }[];
    sort: SortOption

    selectedSizeIds: number[];
    selectedColorIds: number[];

    onSortChange: (v: SortOption) => void;
    onToggleSize: (id: number) => void;
    onToggleColor: (id: number) => void;

}

export function Filters({ sizes, colors, sort, onSortChange, selectedSizeIds, selectedColorIds, onToggleSize, onToggleColor }: FiltersProps): JSX.Element {

    const [sizeOpen, setSizeOpen] = useState(true);
    const [sortOpen, setSortOpen] = useState(true);
    const [colorOpen, setColorOpen] = useState(true);

    return (
        <main className="w-full sm:w-60 px-4 py-6 border-r border-gray-200 text-left">
            <hr className="border-t border-gray-200 my-4" />

            {/* Sort */}
            <section className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setSizeOpen(open => !open)}
                >
                    <span>Size</span>
                    {sizeOpen ? <BiMinus /> : <BiPlus />}
                </div>

                {sortOpen && (
                    <div className="mt-4 space-y-3 text-sm accent-black">
                        {(["newest", "high-low", "low-high"] as const).map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    value={opt}
                                    checked={sort === opt}
                                    onChange={() => onSortChange(opt)}
                                />
                                <span>
                                    {opt === "newest" ? "Newest" : opt === "high-low" ? "High - Low" : "Low - High"}
                                </span>
                            </label>
                        ))}
                    </div>
                )}


            </section>

            {/* SIZE */}
            <section className="mb-4">
                <div
                    className="flex justify-between items-center cursor-pointer font-medium text-sm"
                    onClick={() => setSizeOpen(open => !open)}
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
                                    checked={selectedSizeIds.includes(sz.id)}
                                    onChange={() => onToggleSize(sz.id)}
                                />
                                {sz.size}
                            </label>
                        ))}
                    </div>
                )}
            </section>

            <hr className="border-t border-gray-200 my-4" />

            {/* COLOR */}
            <section className="mb-4">
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
                                    checked={selectedColorIds.includes(col.id)}
                                    onChange={() => onToggleColor(col.id)}
                                />
                                {col.color}
                            </label>
                        ))}
                    </div>
                )}
            </section>


        </main>
    );
}
