import "./ColorCrud.css";
import { Fragment, JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { Color } from "../../../../Models/Color.ts";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {CreateColorForm} from "../../CreateForms/CreateColorForm/CreateColorForm.tsx";

export function ColorCrud(): JSX.Element {
    const [colors, setColors] = useState<Color[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allColors()
            .then(setColors)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteColor = (id: number) => {
        if (confirm("Delete color?")) {
            adminService
                .deleteColor(id)
                .then(() => setColors(prev => prev.filter(c => c.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateColorForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Color", "Actions"];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl	font-semibold">Colors</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            <div className="hidden lg:block">
                <div className="grid grid-cols-3 place-items-center	bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {colors.map(c => (
                    <div key={c.id} className="grid grid-cols-3 place-items-center py-2 border-b">
                        <span>{c.id}</span>
                        <span>{c.color}</span>
                        <div className="flex gap-2">
                            <FaEdit className="cursor-pointer" onClick={() => navigate(`/color/edit/${c.id}`)} />
                            <MdDeleteForever className="cursor-pointer" onClick={() => deleteColor(c.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {colors.map(c => (
                    <div key={c.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {c.id}</p>
                        <p><strong>Color:</strong> {c.color}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/color/edit/${c.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteColor(c.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}