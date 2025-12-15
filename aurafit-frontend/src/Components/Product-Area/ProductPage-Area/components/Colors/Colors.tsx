// src/components/Colors/Colors.tsx
import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductVariant } from "../../../../../Models/ProductVariant";
import "./Colors.css";
import displayService from "../../../../../Services/DisplayService";
import { toast } from "react-toastify";
import { Color } from "../../../../../Models/Color";

interface ColorsProps {

    variants: ProductVariant[];
    selectedVariant: ProductVariant


}

export function Colors({ variants, selectedVariant }: ColorsProps): JSX.Element {
    const navigate = useNavigate();

    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {

        displayService.allAvailableColorsForProduct(selectedVariant.product.id)
        .then(res => setColors(res))
        .catch(err => toast.error(err.response.data)) 

    }, [])

    const selectedColor = selectedVariant.color;
    
    return (
        <div className="flex flex-col gap-3">
            <p className="font-medium">Color</p>
            <div className="flex items-center gap-3">
                {colors.map(color => {
                 
                    const variant = variants.find(v => v.color.id === color.id);
                    return (
                        <button
                            key={color.id}
                            onClick={() => {
                                // onSelect(color);
                                if (variant) {
                                    navigate(
                                        `/product/${variant.product.id}/${variant.id}`
                                    );
                                }
                            }}
                            className={`
                cursor-pointer w-10 h-10 rounded-full border-2
                ${selectedColor?.id === color.id
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

