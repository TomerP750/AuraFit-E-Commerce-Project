import "./CreateProductVariantForm.css";
import {Controller, useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Gender} from "../../../../Models/Enums/Gender.ts";
import {JSX, useEffect, useState} from "react";
import {ProductVariantCreateDTO} from "../../../../Models/DTOS/ProductVariantCreateDTO.ts";
import {Size} from "../../../../Models/Size.ts";
import {Color} from "../../../../Models/Color.ts";

interface CreateProductVariantFormProps {
    onSave: () => void;
}
export function CreateProductVariantForm({onSave}: CreateProductVariantFormProps): JSX.Element {

    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        adminService.allColors()
            .then(res => setColors(res))
            .catch(err => toast.error(err.response.data));
        adminService.allSizes()
            .then(res => setSizes(res))
            .catch(err => toast.error(err.response.data));
    })

    const {register, handleSubmit, formState: { errors }, control} = useForm<ProductVariantCreateDTO>();

    const onSubmit = (data: ProductVariantCreateDTO): void => {

        const size: Size | undefined = sizes.find(s => s.id === data.size.id);

        if (size) {
            const dto = new ProductVariantCreateDTO(size ,data.color, data.material, data.price, data.stockQuantity);

            adminService.createProductVariant(dto)
                .then(() => {
                    onSave();
                    toast.success('Product created!')
                })
                .catch(err => {
                    console.log(dto)
                    console.error('Create product error:', err);
                    toast.error(err.response.data);
                });
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">
            {/*Size*/}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type={"text"}
                       {...register("size", {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.size && (
                    <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type={"text"}
                       {...register("size", {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.size && (
                    <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
            </div>


            {/* Material */}
            <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                    {...register('material', {required: 'Required'})}
                    className="mt-1 w-full border rounded p-2"
                >
                    <option value="">Select...</option>
                    {Object.values(Gender).map(g => (
                        <option key={g} value={g.toUpperCase()}>
                            {g}
                        </option>
                    ))}
                </select>
                {errors.material && <p className="text-red-600 text-sm">{errors.material.message}</p>}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium">Category</label>
                <Controller
                    name="size"
                    control={control}
                    rules={{required: 'Required'}}
                    render={({field}) => (
                        <select
                            value={field.value?.id ?? ''}
                            onChange={e => {
                                const selectedId = Number(e.target.value);
                                const selected = sizes.find(s => s.id === selectedId) || null;
                                field.onChange(selected);
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
                {errors.size && (
                    <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
            </div>

            {/* Stock Quantity */}
            <div>
                <label className="block text-sm font-medium">Product Type</label>
                <Controller
                    name="color"
                    control={control}
                    rules={{required: 'Required'}}
                    render={({field}) => (
                        <select
                            value={field.value?.id ?? ''}
                            onChange={e => {
                                // parse the string back into a number
                                const selectedId = Number(e.target.value);
                                const selected = colors.find(c => c.id === selectedId) || null;
                                field.onChange(selected);
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
                {errors.color && (
                    <p className="text-red-600 text-sm">{errors.color.message}</p>
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
