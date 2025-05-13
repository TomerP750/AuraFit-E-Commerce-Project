import "./CheckoutForm.css";
import {JSX} from "react";
import {CheckoutRequestDTO} from "../../../Models/DTOS/CheckoutRequestDTO.ts";
import {useForm} from "react-hook-form";
import orderService from "../../../Services/OrderService.ts";
import {toast} from "react-toastify";

interface CheckoutFormProps {
    onSubmit: (data: CheckoutRequestDTO) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps): JSX.Element {

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<CheckoutRequestDTO>();

    return (
        <form id={"checkoutForm"} onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                        {...register('firstName', { required: 'First name is required' })}
                        type="text"
                        className="mt-1 block w-full border rounded p-2"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                        {...register('lastName', { required: 'Last name is required' })}
                        type="text"
                        className="mt-1 block w-full border rounded p-2"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                </div>
            </div>

            {/* Contact Info */}
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' }
                    })}
                    type="email"
                    className="mt-1 block w-full border rounded p-2"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    className="mt-1 block w-full border rounded p-2"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Address */}
            <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                    {...register('address', { required: 'Address is required' })}
                    type="text"
                    className="mt-1 block w-full border rounded p-2"
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium">City</label>
                    <input
                        {...register('city', { required: 'City is required' })}
                        type="text"
                        className="mt-1 block w-full border rounded p-2"
                    />
                    {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
                </div>
                <div className="sm:col-span-1">
                    <label className="block text-sm font-medium">Postal Code</label>
                    <input
                        {...register('postalCode', { required: 'Postal code is required' })}
                        type="text"
                        className="mt-1 block w-full border rounded p-2"
                    />
                    {errors.postalCode && <p className="text-red-600 text-sm">{errors.postalCode.message}</p>}
                </div>
            </div>

        </form>
    );
}
