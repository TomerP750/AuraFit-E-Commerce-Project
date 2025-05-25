import "./ProductVariantUpdateForm.css";
import {JSX, useEffect, useState} from "react";
import {UpdateVariantDTO} from "../../../../Models/DTOS/UpdateVariantDTO.ts";
import {Controller, useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Size} from "../../../../Models/Size.ts";
import {Color} from "../../../../Models/Color.ts";
import {Product} from "../../../../Models/Product.ts";



interface ProductVariantUpdateFormProps {
    variant: UpdateVariantDTO;
    onSave: () => void;
}
export function ProductVariantUpdateForm({variant, onSave}: ProductVariantUpdateFormProps): JSX.Element {

    const {register, handleSubmit, control, setValue, formState: { errors }} = useForm<UpdateVariantDTO>();


    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Load selects
        adminService.allSizes().then(setSizes)
            .catch(err => toast.error(err.response?.data || err.message));
        adminService.allColors()
            .then(setColors)
            .catch(err => toast.error(err.response?.data || err.message));
        adminService.allProducts()
            .then(res => setProducts(res))
            .catch(err => toast.error(err.response?.data));

        setValue("id", variant.id);
        setValue("size", variant.size);
        setValue("color", variant.color);
        setValue("basePrice", variant.basePrice);
        setValue("stockQuantity", variant.stockQuantity);
    }, [variant, setValue]);

    const onSubmit = (data: UpdateVariantDTO) => {
        adminService.updateProductVariant(data)
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
                <label className="block text-sm font-medium">Stock Quantity</label>
                <input
                    type="number"
                    {...register("stockQuantity", { required: "Required" })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.stockQuantity && <p className="text-red-600 text-sm">{errors.stockQuantity.message}</p>}
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
                            onChange={e => {
                                const sel = products.find(p => p.id === Number(e.target.value)) || ({} as Product);
                                field.onChange(sel);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.size && <p className="text-red-600 text-sm">{errors.size.message}</p>}
            </div>

            {/* Size */}
            <div>
                <label className="block text-sm font-medium">Size</label>
                <Controller
                    name="size"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={e => {
                                const sel = sizes.find(s => s.id === Number(e.target.value)) || ({} as Size);
                                field.onChange(sel);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {sizes.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.size}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.size && <p className="text-red-600 text-sm">{errors.size.message}</p>}
            </div>

            {/* Color */}
            <div>
                <label className="block text-sm font-medium">Color</label>
                <Controller
                    name="color"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={e => {
                                const sel = colors.find(c => c.id === Number(e.target.value)) || ({} as Color);
                                field.onChange(sel);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {colors.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.color}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.color && <p className="text-red-600 text-sm">{errors.color.message}</p>}
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
