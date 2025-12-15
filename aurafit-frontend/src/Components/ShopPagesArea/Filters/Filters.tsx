import { JSX, useState } from "react";
import "./Filters.css";
import { BiMinus, BiPlus } from "react-icons/bi";


interface FiltersProps {

    sizes: { id: number; size: string }[];
    colors: { id: number; color: string }[];

    selectedSizeIds: number[];
    selectedColorIds: number[];

    onToggleSize: (id: number) => void;
    onToggleColor: (id: number) => void;

}

export function Filters({ sizes, colors, selectedSizeIds, selectedColorIds, onToggleSize, onToggleColor }: FiltersProps): JSX.Element {

    const [sizeOpen, setSizeOpen] = useState(true);
    const [colorOpen, setColorOpen] = useState(true);

    return (
        <main className="w-full sm:w-60 px-4 py-6 border-r border-gray-200 text-left">
            <hr className="border-t border-gray-200 my-4" />

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
                                    checked={selectedSizeIds.includes(sz.id)}
                                    onChange={() => onToggleSize(sz.id)}
                                />
                                {sz.size}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <hr className="border-t border-gray-200 my-4" />

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
                                    checked={selectedColorIds.includes(col.id)}
                                    onChange={() => onToggleColor(col.id)}
                                />
                                {col.color}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
