import { FiFilter } from "react-icons/fi";
import { ProductCard } from "../Product-Area/ProductCard/ProductCard";
import { Filters } from "./Filters/Filters";
import { useEffect, useMemo, useState } from "react";
import { ProductDTO } from "../../Models/DTOS/ProductDTO";
import { useParams } from "react-router-dom";
import displayService from "../../Services/DisplayService";
import { Gender } from "../../Models/Enums/Gender";
import { toast } from "react-toastify";

export type SortOption = "newest" | "high-low" | "low-high";

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
    const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
    const [selectedSizeIds, setSelectedSizeIds] = useState<number[]>([]);
    const [selectedColorIds, setSelectedColorIds] = useState<number[]>([]);
    const [sort, setSort] = useState<SortOption>("newest");

    const [sizes, setSizes] = useState<{ id: number; size: string }[]>([]);
    const [colors, setColors] = useState<{ id: number; color: string }[]>([]);

    const [page, setPage] = useState<number>(0);
    const size = 12;

    const { gender: genderParam } = useParams<{ gender: string }>();

    const config =
        genderParam ? categoryConfig[genderParam.toLowerCase() as keyof typeof categoryConfig] : undefined;

    const genderEnum =
        genderParam ? genderFromParam[genderParam.toLowerCase()] : undefined;


    const toggle = (arr: number[], id: number) =>
        arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

    const filterParams = useMemo(() => ({
        productTypeIds: selectedTypeIds,
        sizeIds: selectedSizeIds,
        colorIds: selectedColorIds,
        page,
        size
    }), [selectedTypeIds, selectedSizeIds, selectedColorIds, page]);

    // const sortParam = useMemo(() => {
    //     switch (sort) {
    //         case "high-low": return "price,desc";
    //         case "low-high": return "price,asc";
    //         default: return "createdAt,desc"; 
    //     }
    // }, [sort]);


    useEffect(() => {
        setPage(0);
    }, [selectedTypeIds, selectedSizeIds, selectedColorIds, sort]);

    useEffect(() => {
        displayService
            .filterProducts(filterParams.sizeIds, filterParams.colorIds, filterParams.page, filterParams.size)
            .then(res => setProducts(res.content))
            .catch(err => toast.error(err?.response?.data ?? "Failed to fetch"));
    }, [filterParams.sizeIds, filterParams.colorIds, filterParams.page, filterParams.size]);

    useEffect(() => {

        if (!genderEnum) return;

        displayService.allProductsByGender(genderEnum)
            .then(res => {
                setProducts(res.content)
            })
            .catch(err => err.response.data);

    }, [genderEnum]);

    useEffect(() => {
        displayService.allSizes()
            .then(res => setSizes(res))
            .catch((err) => {
                toast.error(err.response.data);
            });
        displayService.allColors()
            .then(res => setColors(res))
            .catch((err) => {
                toast.error(err.response.data);
            });
    }, []);

    if (!config) return null;

    return (
        <main className="px-4 pt-10">
            <button
                className="flex items-center gap-2 mb-4 text-lg sm:hidden"

            >
                <FiFilter /> Filters
            </button>

            <div className="flex flex-col sm:flex-row gap-6">

                <aside className={`w-full sm:w-60`}>
                    <Filters
                        sort={sort}
                        sizes={sizes}
                        colors={colors}
                        selectedSizeIds={selectedSizeIds}
                        selectedColorIds={selectedColorIds}
                        onSortChange={setSort}
                        onToggleSize={(id) => setSelectedSizeIds(prev => toggle(prev, id))}
                        onToggleColor={(id) => setSelectedColorIds(prev => toggle(prev, id))} />
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