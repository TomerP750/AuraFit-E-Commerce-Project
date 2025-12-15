import { JSX, useEffect, useMemo, useState } from "react";
import { ProductVariant } from "../../../../../Models/ProductVariant";
import { Size } from "../../../../../Models/Size";
import displayService from "../../../../../Services/DisplayService";
import "./Sizes.css";
import { toast } from "react-toastify";

interface SizesProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect(size: Size): void; // ✅ add this back
}

export function Sizes({ variants, selectedVariant, onSelect }: SizesProps): JSX.Element {
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    displayService
      .allSizes()
      .then(res => setSizes(res))
      .catch(err => toast.error(err.response?.data || err.message));
  }, []);

  const selectedSize = selectedVariant?.size ?? null;
  const selectedColorId = selectedVariant?.color?.id;

  // ✅ which sizes exist for the currently selected color?
  const availableSizeIds = useMemo(() => {
    const relevant = selectedColorId
      ? variants.filter(v => v.color.id === selectedColorId)
      : variants;

    return new Set(relevant.map(v => v.size.id));
  }, [variants, selectedColorId]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-medium">Size</p>
        <p className="text-sm text-black cursor-pointer">Sizing chart</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        {sizes.map(size => {
          const isSelected = selectedSize?.id === size.id;
          const isAvailable = availableSizeIds.has(size.id);

          return (
            <button
              key={size.id}
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelect(size)}
              className={[
                "px-4 py-1 border rounded transition",
                isSelected ? "bg-black text-white" : "",
                !isAvailable ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-black",
              ].join(" ")}
            >
              {size.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
