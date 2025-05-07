// ProductCard.tsx
import { JSX } from "react";
import {NavLink} from "react-router-dom";
import {ProductVariant} from "../../../Models/ProductVariant.ts";
interface ProductCardProps {
    // variant: ProductVariant;
}
export function ProductCard(): JSX.Element {

    return (

        <NavLink className={"text-gray-700 cursor-pointer my-5"} to={`/`}>
            <div className="overflow-hidden">
                <div className="rounded-lg w-[380px] h-[380px] bg-gray-200"/>
            </div>
            <p className="pt-3 pb-1 text-lg">product</p>
            <p className={"text-xl font-medium"}>$15</p>
        </NavLink>
    )
}
