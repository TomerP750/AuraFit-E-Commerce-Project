import "./ProductUpdateForm.css";
import { JSX, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { Category } from "../../../../Models/Category.ts";
import { ProductType } from "../../../../Models/ProductType.ts";
import { Gender } from "../../../../Models/Enums/Gender.ts";
import { UpdateProductDTO } from "../../../../Models/DTOS/UpdateProductDTO.ts";

interface ProductUpdateFormProps {
    product: UpdateProductDTO;
    onSave: () => void;
}

export function ProductUpdateForm({ product, onSave }: ProductUpdateFormProps): JSX.Element {

    const [categories, setCategories] = useState<Category[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const {register, handleSubmit, control, setValue, formState: { errors },} = useForm<UpdateProductDTO>();

    useEffect(() => {
        // Load selects
        adminService.allCategories()
            .then(setCategories)
            .catch(err => toast.error(err.response?.data || err.message));
        adminService
            .allProductTypes()
            .then(setProductTypes)
            .catch(err => toast.error(err.response?.data || err.message));

        setValue("id", product.id);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("gender", product.gender);
        setValue("category", product.category);
        setValue("productType", product.productType);
    }, [product, setValue]);

    const onSubmit = (data: UpdateProductDTO) => {
        adminService.updateProduct(data)
            .then(() => {
                toast.success("Product updated successfully");
                onSave();
            })
            .catch(err => toast.error(err.response?.data || err.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">
            {/* Hidden id field */}
            <input type="hidden" {...register("id")} />

            {/* Name */}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    {...register("name", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    {...register("description", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2 resize-none"
                    rows={3}
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                    {...register("gender", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2"
                >
                    <option value="">Select...</option>
                    {Object.values(Gender).map(g => (
                        <option key={g} value={g}>
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
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={e => {
                                const sel = categories.find(c => c.id === Number(e.target.value)) || ({} as Category);
                                field.onChange(sel);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
            </div>

            {/* Product Type */}
            <div>
                <label className="block text-sm font-medium">Product Type</label>
                <Controller
                    name="productType"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={e => {
                                const sel = productTypes.find(pt => pt.id === Number(e.target.value)) || ({} as ProductType);
                                field.onChange(sel);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {productTypes.map(pt => (
                                <option key={pt.id} value={pt.id}>
                                    {pt.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.productType && <p className="text-red-600 text-sm">{errors.productType.message}</p>}
            </div>

            {/* Submit */}
            <div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
