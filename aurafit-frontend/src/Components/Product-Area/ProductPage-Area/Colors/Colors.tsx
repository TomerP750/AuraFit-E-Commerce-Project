// src/components/Colors/Colors.tsx
import "./Colors.css";
import { useNavigate } from "react-router-dom";
import { Color } from "../../../../Models/Color";
import { ProductVariant } from "../../../../Models/ProductVariant";
import {JSX} from "react";

interface ColorsProps {
    colors: Color[];
    selected: Color | null;
    variants: ProductVariant[];
    onSelect(color: Color): void;
}

export function Colors({colors, selected, variants, onSelect,}: ColorsProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3">
            <p className="font-medium">Color</p>
            <div className="flex items-center gap-3">
                {colors.map(color => {
                    // find a variant for this color
                    const variant = variants.find(v => v.color.id === color.id);
                    return (
                        <button
                            key={color.id}
                            onClick={() => {
                                onSelect(color);
                                if (variant) {
                                    navigate(
                                        `/product/${variant.product.id}/${variant.id}`
                                    );
                                }
                            }}
                            className={`
                cursor-pointer w-10 h-10 rounded-full border-2
                ${selected?.id === color.id
                                ? "ring-2 ring-offset-2 ring-gray-800"
                                : "hover:ring"
                            }
              `}
                            style={{
                                backgroundColor: color.color.toLowerCase(),
                            }}
                            aria-label={`Color ${color.color}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

