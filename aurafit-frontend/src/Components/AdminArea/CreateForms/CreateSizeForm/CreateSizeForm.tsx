import "./CreateSizeForm.css";
import {JSX, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Size} from "../../../../Models/Size.ts";
import {ProductType} from "../../../../Models/ProductType.ts";


interface CreateSizeFormProps {
    onSave: () => void;
}
export function CreateSizeForm({onSave}: CreateSizeFormProps): JSX.Element {
    const {register, handleSubmit, formState: { errors }, control} = useForm<Size>();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);



    const onSubmit = (data: Size) => {

        adminService.createSize(data)
            .then(() => {
                toast.success("Created successfully")
                onSave();
            })
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
                       {...register("size", {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.size && (
                    <p className="text-red-600 text-sm">{errors.size.message}</p>
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
                    Create Size
                </button>
            </div>


        </form>
    );
}

