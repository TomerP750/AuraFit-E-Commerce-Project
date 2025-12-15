import "./FabricAndCare.css";
import {JSX} from "react";
import {ProductVariant} from "../../../../../Models/ProductVariant.ts";

interface FabricAndCareProps {
    variant: ProductVariant;
}
export function FabricAndCare({variant}: FabricAndCareProps): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <p>Fabric & Care</p>
            <ul className="flex flex-col text-sm gap-1 ">
                <li>Material: {variant.material.materialPercent}% {variant.material.name}</li>
                <li>Machine Wash only</li>
            </ul>
        </div>
    );
}
