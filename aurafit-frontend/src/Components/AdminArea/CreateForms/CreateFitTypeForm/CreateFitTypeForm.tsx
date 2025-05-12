import "./CreateFitTypeForm.css";
import {Controller, useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {JSX, useEffect, useState} from "react";
import {FitType} from "../../../../Models/FitType.ts";
import {ProductType} from "../../../../Models/ProductType.ts";

export function CreateFitTypeForm(): JSX.Element {
    const {register, handleSubmit, formState: { errors }, control} = useForm<FitType>();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);


    const onSubmit = (data: FitType) => {
        adminService.createFitType(data)
            .then(() => toast.success("Created successfully"))
            .catch(error => {toast.error(error.response?.data)})
    }

    useEffect(() => {
        adminService.allProductTypes()
            .then(res => setProductTypes(res))
            .catch(err => toast.error(err));
    },[])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">

            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type={"text"}
                       {...register('name', {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
            </div>

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


            <div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Create Fit Type
                </button>
            </div>


        </form>
    );
}
