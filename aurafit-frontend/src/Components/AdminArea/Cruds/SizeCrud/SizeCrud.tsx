// SizeCrud.tsx
import "./SizeCrud.css";
import { JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { Size } from "../../../../Models/Size.ts";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CreateSizeForm } from "../../CreateForms/CreateSizeForm/CreateSizeForm.tsx";

export function SizeCrud(): JSX.Element {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService.allSizes()
            .then(res => setSizes(res))
            .catch(err => {
                toast.error(err.response?.data || err.message)
            });

    }, []);

    const deleteSize = (id: number) => {
        if (confirm("Delete size?")) {
            adminService.deleteSize(id)
                .then(() => setSizes(prev => prev.filter(s => s.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateSizeForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Size", "Product Type", "Actions"];

    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Sizes</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-4 place-items-center bg-gray-100 py-2">
                    {fields.map((f, i) => (
                        <span key={i} className="text-sm font-medium text-gray-700">
              {f}
            </span>
                    ))}
                </div>
                {sizes.map(s => (
                    <div key={s.id} className="grid grid-cols-4 place-items-center py-2 border-b">
                        <span>{s.id}</span>
                        <span>{s.size}</span>
                        <span>{s.productType.name}</span>
                        <div className="flex gap-2">
                            <FaEdit className="cursor-pointer" onClick={() => navigate(`/size/edit/${s.id}`)} />
                            <MdDeleteForever className="cursor-pointer" onClick={() => deleteSize(s.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {sizes.map(s => (
                    <div key={s.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {s.id}</p>
                        <p><strong>Size:</strong> {s.size}</p>
                        <p><strong>SubCategory:</strong> {s.productType.name}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/size/edit/${s.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteSize(s.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
