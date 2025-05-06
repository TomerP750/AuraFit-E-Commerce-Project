// ProductCard.tsx
import { JSX } from "react";
interface ProductCardProps {
    product: { id: number; name: string; price: number; image?: string };
}
export function ProductCard({ product }: ProductCardProps): JSX.Element {

    return (
        <div className="
      w-full max-w-[500px]
      flex flex-col items-center
      bg-white
    ">
            {/* 1:1 placeholder that fills the card’s width */}
            <div className="
        w-full
        aspect-square
        bg-gray-200 rounded-md
        flex items-center justify-center
      ">
                <span className="text-gray-400">No Image</span>
            </div>

            {/* Details below */}
            <div className="mt-4 flex flex-col items-start w-full">
                <h3 className="cursor-pointer text-lg font-semibold">
                    {product.name}
                </h3>
                <p className="text-gray-700">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
}
