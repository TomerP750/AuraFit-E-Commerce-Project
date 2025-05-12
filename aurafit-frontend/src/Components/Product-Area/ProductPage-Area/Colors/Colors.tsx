import "./Colors.css";
import {JSX} from "react";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";

interface ColorsProps {
    variant: ProductVariant;
}
export function Colors({variant}: ColorsProps): JSX.Element {

    return (
        <div className="flex flex-col gap-1">
            <p>Color</p>
            <div className="flex items-center gap-3">
                <div className="cursor-pointer bg-black w-[40px] h-[40px] rounded-full"/>
                <div className={`cursor-pointer bg-${variant.color.color}-900 w-[40px] h-[40px] rounded-full`}/>
            </div>
        </div>
    );
}
