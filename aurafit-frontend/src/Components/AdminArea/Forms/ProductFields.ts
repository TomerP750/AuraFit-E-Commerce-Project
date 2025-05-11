import {FieldConfig} from "./Fieldconfig.ts";
import {FieldValues} from "react-hook-form";

export interface Product extends FieldValues {
    title: string;
    price: number;
    description: string;
    category: string;
}

/** The field list for Product */
export const productFields: FieldConfig<Product>[] = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        validate: (v) => (typeof v === 'string' && v.trim() ? true : 'Required'),
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
    },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
            { value: 'men', label: 'Men' },
            { value: 'women', label: 'Women' },
            { value: 'accessories', label: 'Accessories' },
        ],
    },
];