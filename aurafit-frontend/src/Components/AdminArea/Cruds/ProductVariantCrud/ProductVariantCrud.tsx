import "./ProductVariantCrud.css";
import { JSX, useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService.ts";
import { toast } from "react-toastify";
import { ProductVariant } from "../../../../Models/ProductVariant.ts";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiCheckboxChecked, BiPlus, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {CreateProductVariantForm} from "../../CreateForms/CreateProductVariantForm/CreateProductVariantForm.tsx";

export function ProductVariantCrud(): JSX.Element {
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService.getAllProductVariants()
            .then(res => setVariants(res))
            .catch(err => toast.error(err.response.data));
    }, []);

    const deleteVariant = (id: number) => {
        if (confirm("Delete variant?")) {
            adminService.deleteProductVariant(id)
                .then(() => setVariants(prev => prev.filter(v => v.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    const fields = [
        "Id",
        "Size",
        "Color",
        // "Material",
        "Base Price",
        "Sale Price",
        "Stock",
        "On Sale",
        "Actions",
    ];

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to variants
                </button>
                <CreateProductVariantForm onSave={() => setFormOpen(false)} />
            </div>
        );
    }

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Product Variants</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-10 place-items-center bg-gray-100 py-2">
                    {fields.map((f, i) => (
                        <span key={i} className="text-sm font-medium text-gray-700">
              {f}
            </span>
                    ))}
                </div>
                {variants.map(v => (
                    <div key={v.id} className="grid grid-cols-10 place-items-center py-2 border-b">
                        <span>{v.id}</span>
                        <span>{v.size.size}</span>
                        <span>{v.color.color}</span>
                        <span>{v.basePrice}</span>
                        <span>{v.salePrice}</span>
                        <span>{v.stockQuantity}</span>
                        <span>{v.onSale ? <BiCheckboxChecked /> : <BiX />}</span>
                        <div className="flex gap-2">
                            <p className="cursor-pointer" onClick={() => deleteVariant(v.id)}>Edit</p>
                            <p className="cursor-pointer" onClick={() => navigate(`/variant/edit/${v.id}`)}>Delete</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {variants.map(v => (
                    <div key={v.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {v.id}</p>
                        <p><strong>Size:</strong> {v.size.size}</p>
                        <p><strong>Color:</strong> {v.color.color}</p>
                        <p><strong>SKU:</strong> {v.sku}</p>
                        <p><strong>Base Price:</strong> {v.basePrice}</p>
                        <p><strong>Sale Price:</strong> {v.salePrice}</p>
                        <p><strong>Stock:</strong> {v.stockQuantity}</p>
                        <p><strong>On Sale:</strong> {v.onSale ? 'Yes' : 'No'}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/variant/edit/${v.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteVariant(v.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}