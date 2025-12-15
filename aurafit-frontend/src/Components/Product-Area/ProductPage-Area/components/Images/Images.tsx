import { JSX } from "react";
import defaultImage from "../../../../../assets/defaultImage.png";
import { ProductVariant } from "../../../../../Models/ProductVariant.ts";
import "./Images.css";


interface ImagesProps {
    variant: ProductVariant
}
export function Images({variant}: ImagesProps): JSX.Element {

    const mainImageUrl = variant.productImages?.[0]?.trim() || defaultImage;

    return (
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row items-start gap-4">
            {/* Thumbnails on desktop (left), below on mobile */}
            <div className="flex order-2 md:order-1 gap-2 overflow-x-auto md:flex-col md:overflow-x-visible">
                {[...Array(2)].map((_, idx) => (
                    <div
                        key={idx}
                        className="w-16 sm:w-20 md:w-24 aspect-square rounded-lg bg-black flex-shrink-0"
                    />
                ))}
            </div>

            {/* Main image (right on desktop, top on mobile) */}
            <div className="order-1 md:order-2 w-full aspect-square rounded-lg bg-black overflow-hidden">
                 <img src={mainImageUrl} alt="Product" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}
