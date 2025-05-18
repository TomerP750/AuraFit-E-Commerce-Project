import {ProductVariant} from "../Models/ProductVariant.ts";


export type SortOption = "high-low" | "low-high" | "newest";


export type GroupedVariants = { variants: ProductVariant[] }[];


export function sortVariants(variants: ProductVariant[], sortOption: SortOption): ProductVariant[] {
    return [...variants].sort((a, b) => {
        switch (sortOption) {
            case "high-low":
                return b.basePrice - a.basePrice;
            case "low-high":
                return a.basePrice - b.basePrice;
            case "newest":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;

        }
    })
}


export function sortGroupedVariants(
    cards: GroupedVariants,
    sortOption: SortOption
): GroupedVariants {
    // First, sort inside each group
    const withInnerSorted = cards.map(card => ({
        variants: sortVariants(card.variants, sortOption),
    }));

    // Then reorder the groups themselves:
    return withInnerSorted.sort((a, b) => {
        const va = a.variants[0];
        const vb = b.variants[0];

        switch (sortOption) {
            case 'high-low':
                return vb.basePrice - va.basePrice;
            case 'low-high':
                return va.basePrice - vb.basePrice;
            case 'newest':
                return (
                    new Date(vb.createdAt).getTime() -
                    new Date(va.createdAt).getTime()
                );
            default:
                return 0;
        }
    });
}


