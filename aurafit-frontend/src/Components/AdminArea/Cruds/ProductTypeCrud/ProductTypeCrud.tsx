import "./ProductTypeCrud.css";
import { Fragment, JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { ProductType } from "../../../../Models/ProductType.ts";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function ProductTypeCrud(): JSX.Element {
    const [types, setTypes] = useState<ProductType[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allProductTypes()
            .then(setTypes)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteProductType = (id: number) => {
        if (confirm("Delete product type?")) {
            adminService
                .deleteProductType(id)
                .then(() => setTypes(prev => prev.filter(t => t.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                {/*<CreateProductTypeForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />*/}
            </div>
        );
    }

    const fields: string[] = ["Id", "Name", "Actions"];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Product Types</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            <div className="hidden lg:block">
                <div className="grid grid-cols-3 place-items-center bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {types.map(t => (
                    <div key={t.id} className="grid grid-cols-3 place-items-center py-2 border-b">
                        <span>{t.id}</span>
                        <span>{t.name}</span>
                        <div className="flex gap-2">
                            <FaEdit className="cursor-pointer" onClick={() => navigate(`/producttype/edit/${t.id}`)} />
                            <MdDeleteForever className="cursor-pointer" onClick={() => deleteProductType(t.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {types.map(t => (
                    <div key={t.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {t.id}</p>
                        <p><strong>Name:</strong> {t.name}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/producttype/edit/${t.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteProductType(t.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}