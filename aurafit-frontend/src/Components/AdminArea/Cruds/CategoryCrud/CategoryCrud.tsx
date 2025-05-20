// CategoryCrud.tsx
import "./CategoryCrud.css";
import {JSX, useEffect, useState} from "react";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Category} from "../../../../Models/Category.ts";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {CreateCategoryForm} from "../../CreateForms/CreateCategoryForm/CreateCategoryForm.tsx";

export function CategoryCrud(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allCategories()
            .then(setCategories)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteCategory = (id: number) => {
        if (confirm("Delete category?")) {
            adminService
                .deleteCategory(id)
                .then(() => setCategories(prev => prev.filter(c => c.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateCategoryForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Name", "Actions"];

    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Categories</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-3 place-items-center bg-gray-100 py-2">
                    {fields.map((f, i) => (
                        <span key={i} className="text-sm font-medium text-gray-700">
              {f}
            </span>
                    ))}
                </div>
                {categories.map(c => (
                    <div key={c.id} className="grid grid-cols-3 place-items-center py-2 border-b">
                        <span>{c.id}</span>
                        <span>{c.name}</span>
                        <div className="flex gap-2">
                            <p className="cursor-pointer" onClick={() => navigate(`/category/edit/${c.id}`)} >Edit</p>
                            <p className="cursor-pointer" onClick={() => deleteCategory(c.id)} >Delete</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {categories.map(c => (
                    <div key={c.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {c.id}</p>
                        <p><strong>Name:</strong> {c.name}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/category/edit/${c.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteCategory(c.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
