import "./CreateSizeForm.css";
import {JSX} from "react";
import {useForm} from "react-hook-form";
import {FitType} from "../../../../Models/FitType.ts";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Size} from "../../../../Models/Size.ts";

export function CreateSizeForm(): JSX.Element {
    const {register, handleSubmit, formState: { errors }} = useForm<Size>();


    const onSubmit = (data: Size) => {
        adminService.createMaterial(data)
            .then(() => toast.success("Created successfully"))
            .catch(error => {toast.error(error.response?.data)})
    }

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
