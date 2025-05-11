// CreateProductForm.tsx
import {JSX, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {ProductType} from "../../../../Models/ProductType.ts";
import {Category} from "../../../../Models/Category.ts";
import adminService from "../../../../Services/AdminService.ts";
import {ProductCreateDTO} from "../../../../Models/DTOS/ProductCreateDTO.ts";
import {Gender} from "../../../../Models/Enums/Gender.ts";


export function CreateProductForm(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);


    useEffect(() => {
        adminService.allCategories()
            .then(setCategories)
            .catch(err => toast.error(err));
        adminService.allProductTypes()
            .then(setProductTypes)
            .catch(err => toast.error(err));
    }, []);

    const {register, handleSubmit, formState: { errors }, control} = useForm<ProductCreateDTO>();

    const onSubmit = (data: ProductCreateDTO): void => {

        const productType: ProductType | undefined = productTypes.find(p => p.id === data.productType.id)

        if (productType) {
            const dto = new ProductCreateDTO(data.name ,data.description, data.gender, data.category!, productType);
            adminService.createProduct(dto)
                .then(() => toast.success('Product created!'))
                .catch(err => {
                    console.error('Create product error:', err);
                    toast.error(err.response?.data || err.message || 'Create failed');
                });
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">
            {/*Name*/}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type={"text"}
                    {...register('name', {required: 'Required'})}
                    className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.description && (
                    <p className="text-red-600 text-sm">{errors.description.message}</p>
                )}
            </div>


            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    {...register('description', {required: 'Required'})}
                    className="mt-1 w-full border rounded p-2 resize-none"
                    rows={3}
                />
                {errors.description && (
                    <p className="text-red-600 text-sm">{errors.description.message}</p>
                )}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                    {...register('gender', {required: 'Required'})}
                    className="mt-1 w-full border rounded p-2"
                >
                    <option value="">Select...</option>
                    {Object.values(Gender).map(g => (
                        <option key={g} value={g.toUpperCase()}>
                            {g}
                        </option>
                    ))}
                </select>
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium">Category</label>
                <Controller
                    name="category"
                    control={control}
                    rules={{required: 'Required'}}
                    render={({field}) => (
                        <select
                            value={field.value?.id ?? ''}
                            onChange={e => {
                                const selectedId = Number(e.target.value);
                                const selected = categories.find(c => c.id === selectedId) || null;
                                field.onChange(selected);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.category && (
                    <p className="text-red-600 text-sm">{errors.category.message}</p>
                )}
            </div>

            {/* ProductType */}
            <div>
                <label className="block text-sm font-medium">Product Type</label>
                <Controller
                    name="productType"
                    control={control}
                    rules={{required: 'Required'}}
                    render={({field}) => (
                        <select
                            value={field.value?.id ?? ''}
                            onChange={e => {
                                // parse the string back into a number
                                const selectedId = Number(e.target.value);
                                const selected = productTypes.find(sc => sc.id === selectedId) || null;
                                field.onChange(selected);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {productTypes.map(sc => (
                                <option key={sc.id} value={sc.id}>
                                    {sc.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.productType && (
                    <p className="text-red-600 text-sm">{errors.productType.message}</p>
                )}
            </div>

            {/* Submit */}
            <div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
}
