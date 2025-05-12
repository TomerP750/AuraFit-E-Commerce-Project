// CreateProductVariantForm.tsx
import { useEffect, useState, JSX } from "react";
import { useForm, Controller } from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { ProductVariantCreateDTO } from "../../../../Models/DTOS/ProductVariantCreateDTO.ts";
import { Size } from "../../../../Models/Size.ts";
import { Color } from "../../../../Models/Color.ts";
import { Product } from "../../../../Models/Product.ts";
import { Material } from "../../../../Models/Material.ts";

interface CreateProductVariantFormProps {
    onSave: () => void;
}

export function CreateProductVariantForm({
                                             onSave,
                                         }: CreateProductVariantFormProps): JSX.Element {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductVariantCreateDTO>();

    // Load lookup data once
    useEffect(() => {
        adminService.allSizes()
            .then(setSizes)
            .catch(err => toast.error(err.response?.data || err.message));

        adminService.allColors()
            .then(setColors)
            .catch(err => toast.error(err.response?.data || err.message));

        adminService.allMaterials()
            .then(setMaterials)
            .catch(err => toast.error(err.response?.data || err.message));

        adminService.allProducts()
            .then(setProducts)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const onSubmit = (data: ProductVariantCreateDTO) => {
        // data.size, data.color, data.material, data.product are full objects
        const dto = new ProductVariantCreateDTO(
            data.size,
            data.color,
            data.material,
            data.basePrice,
            data.stockQuantity,
            data.product
        );

        adminService.createProductVariant(dto)
            .then(() => {
                toast.success("Variant created!");
                onSave();
            })
            .catch(err => {
                console.log("Create variant error:", data);
                toast.error(err.response?.data || err.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Base Price */}
            <div>
                <label className="block text-sm font-medium">Base Price</label>
                <input
                    type="number"
                    {...register("basePrice", {
                        required: "Required",
                        valueAsNumber: true,
                    })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.basePrice && (
                    <p className="text-red-600 text-sm">{errors.basePrice.message}</p>
                )}
            </div>

            {/* Stock Quantity */}
            <div>
                <label className="block text-sm font-medium">Stock Quantity</label>
                <input
                    type="number"
                    {...register("stockQuantity", {
                        required: "Required",
                        valueAsNumber: true,
                    })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.stockQuantity && (
                    <p className="text-red-600 text-sm">{errors.stockQuantity.message}</p>
                )}
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
                                const sel = products.find(p => p.id === +e.target.value) || null;
                                field.onChange(sel);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select…</option>
                            {products.map(p => (
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
                                const sel = sizes.find(s => s.id === +e.target.value) || null;
                                field.onChange(sel);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select…</option>
                            {sizes.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.size}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.size && (
                    <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
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
                                const sel = colors.find(c => c.id === +e.target.value) || null;
                                field.onChange(sel);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select…</option>
                            {colors.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.color}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.color && (
                    <p className="text-red-600 text-sm">{errors.color.message}</p>
                )}
            </div>

            {/* Material */}
            <div>
                <label className="block text-sm font-medium">Material</label>
                <Controller
                    name="material"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ""}
                            onChange={e => {
                                const sel = materials.find(m => m.id === +e.target.value) || null;
                                field.onChange(sel);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select…</option>
                            {materials.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.name} ({m.materialPercent}%)
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.material && (
                    <p className="text-red-600 text-sm">{errors.material.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Create Variant
            </button>
        </form>
    );
}
