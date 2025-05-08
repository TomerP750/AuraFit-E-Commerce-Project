// CreateProductForm.tsx
import {JSX, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {SubCategory} from "../../../Models/SubCategory.ts";
import {Category} from "../../../Models/Category.ts";
import adminService from "../../../Services/AdminService.ts";
import {ProductCreateDTO} from "../../../Models/DTOS/ProductCreateDTO.ts";
import {Gender} from "../../../Models/Enums/Gender.ts";

type FormValues = {
    description: string;
    gender: Gender;
    categoryId: number;
    subCategoryId: number;
};

export function CreateProductForm(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    useEffect(() => {
        adminService.allCategories()
            .then(res => setCategories(res))
            .catch(err => toast.error(err));
        adminService.allSubCategories()
            .then(res => setSubCategories(res))
            .catch(err => toast.error(err));

    }, []);


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues): void => {
        const category = categories.find(c => c.id === data.categoryId)!;
        const subCategory = subCategories.find(s => s.id === data.subCategoryId)!;


        const dto = new ProductCreateDTO(
            data.description,
            data.gender,
            category,
            subCategory
        );

        adminService.createProduct(dto)
            .then(() => toast.success('Product created!'))
            .catch(err => toast.error(err.repsonse.data));
    };

    console.log(categories);
    console.log(subCategories);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-10">
            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    {...register('description', { required: 'Required' })}
                    className="mt-1 w-full border rounded p-2 resize-none"
                    rows={3}
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                    {...register('gender', { required: 'Required' })}
                    className="mt-1 w-full border rounded p-2"
                >
                    <option value="">Select...</option>
                    {Object.values(Gender).map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
            </div>

            {/* Category & SubCategory */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        {...register('categoryId', { required: 'Required', valueAsNumber: true })}
                        className="mt-1 w-full border rounded p-2"
                    >
                        <option value="">Select...</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-600 text-sm">{errors.categoryId.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">SubCategory</label>
                    <select
                        {...register('subCategoryId', { required: 'Required', valueAsNumber: true })}
                        className="mt-1 w-full border rounded p-2"
                    >
                        <option value="">Select...</option>
                        {subCategories.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.subCategoryId && <p className="text-red-600 text-sm">{errors.subCategoryId.message}</p>}
                </div>
            </div>

            {/* Submit Button */}
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
