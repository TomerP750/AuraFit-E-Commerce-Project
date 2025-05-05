// ProductCard.tsx
import { JSX } from "react";
interface ProductCardProps {
    product: { id: number; name: string; price: number; image?: string };
}
export function ProductCard({ product }: ProductCardProps): JSX.Element {
    return (
        <div className="bg-white h-[700px] rounded-lg overflow-hidden w-full">
            <div
                className="w-full h-2/3 object-cover bg-cyan-600"
                style={{ backgroundImage: product.image ? `url(${product.image})` : "" }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                </h3>
                <p className="text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    );
}
