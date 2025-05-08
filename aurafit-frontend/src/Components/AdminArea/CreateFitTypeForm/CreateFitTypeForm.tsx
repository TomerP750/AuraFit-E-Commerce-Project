import "./CreateFitTypeForm.css";
import {useForm} from "react-hook-form";
import adminService from "../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {JSX} from "react";
import {FitType} from "../../../Models/FitType.ts";

export function CreateFitTypeForm(): JSX.Element {
    const {register, handleSubmit, formState: { errors }} = useForm<FitType>();


    const onSubmit = (data: FitType) => {
        adminService.createMaterial(data)
            .then(() => toast.success("Created successfully"))
            .catch(error => {toast.error(error.response?.data)})
    }

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
                <label className="block text-sm font-medium">Sub Category</label>
                <input type={"text"}
                       {...register('name', {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name.message}</p>
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
