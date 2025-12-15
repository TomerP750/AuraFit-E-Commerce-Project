import "./Description.css";
import {JSX} from "react";
import {ProductVariant} from "../../../../../Models/ProductVariant.ts";

interface DescriptionProps {
    variant: ProductVariant;
}
export function Description({variant}: DescriptionProps): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <p>Description</p>
            <p className={"text-gray-500"}>{variant.product.description}</p>
        </div>
    );
}
