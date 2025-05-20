import {ProductVariantDTO} from "../../../Models/DTOS/ProductVariantDTO.ts";
import {NavLink} from "react-router-dom";

interface VariantMiniCardProps {
    variant: ProductVariantDTO;
    onSelect?: () => void;
}

export function VariantMiniCard({variant, onSelect}: VariantMiniCardProps) {
    return (
        <NavLink
            to={`/product/${variant.product.id}/${variant.id}`}
            onClick={onSelect}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
        >
            <div className="h-12 w-12 rounded bg-gray-200" />
            <div className="flex flex-col text-sm">
                <span className="font-medium truncate">{variant.product.name}</span>
                <span className="text-gray-500">{variant.color.color} • {variant.size.size}</span>
                <span className="font-semibold">${variant.onSale ? variant.salePrice : variant.basePrice}</span>
            </div>
        </NavLink>
    );
}
