// CreatePromotionByProductsForm.tsx
import "./CreatePromotionByProductsForm.css";
import { JSX, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import adminService from "../../../../Services/AdminService.ts";
import promotionService from "../../../../Services/PromotionService.ts";
import { Product } from "../../../../Models/Product.ts";
import { CreatePromotionByProductDTO } from "../../../../Models/DTOS/CreatePromotionByProductDTO.ts";

interface CreatePromotionByProductsFormProps {
    onSave: () => void;
}

export function CreatePromotionByProductsForm({onSave,}: CreatePromotionByProductsFormProps): JSX.Element {

    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        adminService
            .allProducts()
            .then(setProducts)
            .catch((err) => toast.error(err.response?.data || err.message));
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreatePromotionByProductDTO>();

    const onSubmit = (data: CreatePromotionByProductDTO) => {
        promotionService
            .createPromotionForProduct(data)
            .then(() => {
                toast.success("Promotion created!");
                onSave();
            })
            .catch((err) => toast.error(err.response?.data || err.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">
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

            {/* Discount Percent */}
            <div>
                <label className="block text-sm font-medium">Discount %</label>
                <input
                    type="number"
                    step="0.01"
                    {...register("discountPercent", {
                        required: "Required",
                        min: { value: 0, message: "Must be ≥ 0" },
                        max: { value: 100, message: "Must be ≤ 100" },
                    })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.discountPercent && (
                    <p className="text-red-600 text-sm">{errors.discountPercent.message}</p>
                )}
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                    type="datetime-local"
                    {...register("startTime", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.startTime && (
                    <p className="text-red-600 text-sm">{errors.startTime.message}</p>
                )}
            </div>

            {/* End Date */}
            <div>
                <label className="block text-sm font-medium">End Date</label>
                <input
                    type="datetime-local"
                    {...register("endTime", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.endTime && <p className="text-red-600 text-sm">{errors.endTime.message}</p>}
            </div>

            {/* Product */}
            <div>
                <label className="block text-sm font-medium">Product</label>
                <Controller
                    name="product"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={(e) => {
                                const selected =
                                    products.find((p) => p.id === Number(e.target.value)) || null;
                                field.onChange(selected);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select a product…</option>
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.product && (
                    <p className="text-red-600 text-sm">{errors.product.message}</p>
                )}
            </div>

            {/* Submit */}
            <div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Create Promotion
                </button>
            </div>
        </form>
    );
}
