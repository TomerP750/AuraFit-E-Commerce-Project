import "./Colors.css";
import {JSX} from "react";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";
import {Color} from "../../../../Models/Color.ts";

interface ColorsProps {
    colors: Color[];
    /** currently selected color (or null) */
    selected: Color | null;
    /** callback to pick a new color */
    onSelect(color: Color): void;
}
export function Colors({ colors, selected, onSelect }: ColorsProps): JSX.Element {

    return (
        // <div className="flex flex-col gap-1">
        //     <p>Color</p>
        //     <div className="flex items-center gap-3">
        //         <div className="cursor-pointer bg-black w-[40px] h-[40px] rounded-full"/>
        //         <div className={`cursor-pointer bg-${variant.color.color}-900 w-[40px] h-[40px] rounded-full`}/>
        //     </div>
        // </div>

        <div className="flex flex-col gap-1">
            <p className="font-medium">Color</p>
            <div className="flex items-center gap-3">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onSelect(color)}
                        className={`w-10 h-10 rounded-full border-2${selected === color ? 'ring-2 ring-offset-2' : 'hover:ring'}`}
                        style={{backgroundColor: color.color.toLowerCase()}}
                    />
                ))}
            </div>
        </div>
    );
}
