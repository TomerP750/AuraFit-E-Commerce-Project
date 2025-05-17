import "./Colors.css";
import {JSX} from "react";
import {Color} from "../../../../Models/Color.ts";

interface ColorsProps {
    colors: Color[];
    selected: Color | null;
    onSelect(color: Color): void;
}
export function Colors({ colors, selected, onSelect }: ColorsProps): JSX.Element {

    return (

        <div className="flex flex-col gap-3">
            <p className="font-medium">Color</p>
            <div className="flex items-center gap-3">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onSelect(color)}
                        className={`cursor-pointer w-10 h-10 rounded-full border-2 ${selected === color ? `ring-2 ring-offset-2` : 'hover:ring'}`}
                        style={{backgroundColor: color.color.toLowerCase()}}
                    />
                ))}
            </div>
        </div>
    );
}
