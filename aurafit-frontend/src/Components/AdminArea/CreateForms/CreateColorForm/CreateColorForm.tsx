import "./CreateColorForm.css";
import {useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {JSX} from "react";
import {Color} from "../../../../Models/Color.ts";


interface CreateColorFormProps {
    onSave: () => void;
}
export function CreateColorForm({onSave}: CreateColorFormProps): JSX.Element {
    const {register, handleSubmit, formState: { errors }} = useForm<Color>();


    const onSubmit = (data: Color) => {
        adminService.createColor(data)
            .then(() => {
                toast.success("Created successfully")
                onSave();
            })
            .catch(error => {toast.error(error.response?.data)})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded shadow space-y-6">

            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type={"text"}
                       {...register('color', {required: 'Required'})}
                       className="mt-1 w-full border rounded p-2 resize-none"
                />
                {errors.color && (
                    <p className="text-red-600 text-sm">{errors.color.message}</p>
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
