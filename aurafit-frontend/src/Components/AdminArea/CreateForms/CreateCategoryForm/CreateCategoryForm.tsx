import "./CreateCategoryForm.css";
import {JSX} from "react";
import {useForm} from "react-hook-form";
import {FitType} from "../../../../Models/FitType.ts";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Category} from "../../../../Models/Category.ts";



export function CreateCategoryForm(): JSX.Element {
    const {register, handleSubmit, formState: { errors }} = useForm<Category>();


    const onSubmit = (data: Category) => {
        adminService.createCategory(data)
            .then(() => {
                toast.success("Created successfully")
            })
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
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Create Category
                </button>
            </div>


        </form>
    );
}
