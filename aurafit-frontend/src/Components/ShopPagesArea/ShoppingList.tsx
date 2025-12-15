import { FiFilter } from "react-icons/fi";
import { ProductCard } from "../Product-Area/ProductCard/ProductCard";
import { Filters } from "./Filters/Filters";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../Models/DTOS/ProductDTO";
import { useParams } from "react-router-dom";
import displayService from "../../Services/DisplayService";
import { Gender } from "../../Models/Enums/Gender";


export const categoryConfig = {
    men: {
        title: "Men's Collection",
        heroSubtitle: "Performance-ready fits.",
    },
    women: {
        title: "Women's Collection",
        heroSubtitle: "Style meets comfort.",
    },
    accessories: {
        title: "Accessories",
        heroSubtitle: "Details that complete the look.",
    },
} as const;

const genderFromParam: Record<string, Gender> = {
    men: Gender.MEN,
    women: Gender.WOMEN,
    accessories: Gender.ACCESSORIES,
};

export function ShoppingList() {

    const [products, setProducts] = useState<ProductDTO[]>([]);

    const { gender: genderParam } = useParams<{ gender: string }>();
    const config =
        genderParam ? categoryConfig[genderParam.toLowerCase() as keyof typeof categoryConfig] : undefined;

    const genderEnum =
        genderParam ? genderFromParam[genderParam.toLowerCase()] : undefined;

    useEffect(() => {

        if (!genderEnum) return;

        displayService.allProductsByGender(genderEnum)
            .then(res => {
                setProducts(res.content)
                console.log(res.content);
                
            })
            .catch(err => err.response.data);

    }, [genderEnum]);

    if (!config) return null;

    return (
        <main className="container mx-auto px-4 pt-10">
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"

            >
                <FiFilter /> Filters
            </button>

            <div className="flex flex-col sm:flex-row gap-6">

                <aside className={`w-full sm:w-60`}>
                    <Filters />
                </aside>

                <main className="flex-1">
                    <h2 className="text-2xl font-medium mb-6">{config.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                variants={p.variants}
                            />
                        ))}
                    </div>
                </main>


            </div>
        </main>
    );
}