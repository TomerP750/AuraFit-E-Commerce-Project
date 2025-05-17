// CreatePromotionForm.tsx
import { JSX, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import adminService from '../../../../Services/AdminService.ts';
import { ProductVariant } from '../../../../Models/ProductVariant.ts';
import { CreatePromotionDTO } from '../../../../Models/DTOS/CreatePromotionDTO.ts';
import promotionService from "../../../../Services/PromotionService.ts";

interface CreatePromotionFormProps {
    onSave: () => void;
}

export function CreatePromotionForm({ onSave }: CreatePromotionFormProps): JSX.Element {
    const [variants, setVariants] = useState<ProductVariant[]>([]);

    useEffect(() => {
        adminService.getAllProductVariants()
            .then(setVariants)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const {register, handleSubmit, control, formState: { errors }} = useForm<CreatePromotionDTO>();

    const onSubmit = (data: CreatePromotionDTO): void => {
        promotionService.createPromotionForOneVariant(data)
            .then(() => {
                toast.success('Promotion created!');
                onSave();
            })
            .catch(err => toast.error(err.response?.data || err.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    {...register('name', { required: 'Required' })}
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
                    {...register('discountPercent', {
                        required: 'Required',
                        min: { value: 0, message: 'Must be ≥ 0' },
                        max: { value: 100, message: 'Must be ≤ 100' }
                    })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.discountPercent && (
                    <p className="text-red-600 text-sm">{errors.discountPercent.message}</p>
                )}
            </div>

            {/* Start Time */}
            <div>
                <label className="block text-sm font-medium">Start Time</label>
                <input
                    type="datetime-local"
                    {...register('startTime', { required: 'Required' })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.startTime && <p className="text-red-600 text-sm">{errors.startTime.message}</p>}
            </div>

            {/* End Time */}
            <div>
                <label className="block text-sm font-medium">End Time</label>
                <input
                    type="datetime-local"
                    {...register('endTime', { required: 'Required' })}
                    className="mt-1 w-full border rounded p-2"
                />
                {errors.endTime && <p className="text-red-600 text-sm">{errors.endTime.message}</p>}
            </div>

            {/* Product Variant */}
            <div>
                <label className="block text-sm font-medium">Product Variant</label>
                <Controller
                    name="productVariant"
                    control={control}
                    rules={{ required: 'Required' }}
                    render={({ field }) => (
                        <select
                            value={field.value?.id ?? ''}
                            onChange={e => {
                                const selected = variants.find(v => v.id === Number(e.target.value)) || null;
                                field.onChange(selected);
                            }}
                            className="mt-1 w-full border rounded p-2"
                        >
                            <option value="">Select...</option>
                            {variants.map(v => (
                                <option key={v.id} value={v.id}>
                                    {`${v.product.name} – ${v.color.color} / ${v.size.size}`}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.productVariant && (
                    <p className="text-red-600 text-sm">{errors.productVariant.message}</p>
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
