import "./MaterialCrud.css";
import { Fragment, JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { Material } from "../../../../Models/Material.ts";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CreateMaterialForm } from "../../CreateForms/CreateMaterialForm/CreateMaterialForm.tsx";

export function MaterialCrud(): JSX.Element {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allMaterials()
            .then(setMaterials)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteMaterial = (id: number) => {
        // if (confirm("Delete material?")) {
        //     adminService
        //         .deleteMaterial(id)
        //         .then(() => setMaterials(prev => prev.filter(m => m.id !== id)))
        //         .catch(err => toast.error(err.response?.data || err.message));
        // }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateMaterialForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Name", "Material Percent", "Product Variant", "Actions"];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Materials</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            <div className="hidden lg:block">
                <div className="grid grid-cols-5 place-items-center bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {materials.map(m => (
                    <div key={m.id} className="grid grid-cols-5 place-items-center py-2 border-b">
                        <span>{m.id}</span>
                        <span>{m.name}</span>
                        <span>{m.materialPercent}</span>
                        <span>{m.productVariant.id}</span>
                        <div className="flex gap-2">
                            <FaEdit className="cursor-pointer" onClick={() => navigate(`/material/edit/${m.id}`)} />
                            <MdDeleteForever className="cursor-pointer" onClick={() => deleteMaterial(m.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {materials.map(m => (
                    <div key={m.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {m.id}</p>
                        <p><strong>Name:</strong> {m.name}</p>
                        <p><strong>Material Percent:</strong> {m.materialPercent}</p>
                        <p><strong>Product Variant Id:</strong> {m.productVariant.id}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/material/edit/${m.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteMaterial(m.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}