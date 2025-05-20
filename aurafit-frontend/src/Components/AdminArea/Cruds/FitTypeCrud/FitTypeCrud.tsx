import "./FitTypeCrud.css";
import {JSX} from "react";
import "./FitTypeCrud.css";
import { Fragment, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { FitType } from "../../../../Models/FitType.ts";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CreateFitTypeForm } from "../../CreateForms/CreateFitTypeForm/CreateFitTypeForm.tsx";

export function FitTypeCrud(): JSX.Element {
    const [fitTypes, setFitTypes] = useState<FitType[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService.allFitTypes()
            .then(res => setFitTypes(res))
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteFitType = (id: number) => {
        if (confirm("Delete fit type?")) {
            adminService
                .deleteFitType(id)
                .then(() => setFitTypes(prev => prev.filter(f => f.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateFitTypeForm onSave={() => setFormOpen(false)} setFormOpen={() => setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Name", "Product Type", "Actions"];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Fit Types</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            <div className="hidden lg:block">
                <div className="grid grid-cols-4 place-items-center bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {fitTypes.map(f => (
                    <div key={f.id} className="grid grid-cols-4 place-items-center py-2 border-b">
                        <span>{f.id}</span>
                        <span>{f.name}</span>
                        <span>{f.productType.name}</span>
                        <div className="flex gap-2">
                            <p className="cursor-pointer" onClick={() => navigate(`/fittype/edit/${f.id}`)}>Edit</p>
                            <p className="cursor-pointer" onClick={() => deleteFitType(f.id)}>Delete</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {fitTypes.map(f => (
                    <div key={f.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {f.id}</p>
                        <p><strong>Name:</strong> {f.name}</p>
                        <p><strong>SubCategory:</strong> {f.productType.name}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/fittype/edit/${f.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteFitType(f.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
