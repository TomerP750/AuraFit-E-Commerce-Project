import "./ProductCrud.css";
import {Fragment, JSX, useEffect, useState} from "react";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Product} from "../../../../Models/Product.ts";
import {MdDeleteForever} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {BiCheckboxChecked, BiPlus, BiX} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {CreateProductForm} from "../../CreateForms/CreateProductForm/CreateProductForm.tsx";

export function ProductCrud(): JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        adminService
            .allProducts()
            .then(setProducts)
            .catch(err => toast.error(err.response?.data || err.message));
    }, []);

    const deleteProduct = (id: number) => {
        if (confirm("Delete product?")) {
            adminService
                .deleteProduct(id)
                .then(() => setProducts(prev => prev.filter(p => p.id !== id)))
                .catch(err => toast.error(err.response?.data || err.message));
        }
    };

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateProductForm onSave={() => setFormOpen(false)} setFormOpen={()=>setFormOpen(false)} />
            </div>
        );
    }

    const fields: string[] = ["Id", "Name", "Gender", "Type", "On Sale", "Actions"];

    if (formOpen) {
        return (
            <div className="p-4 w-full">
                <button onClick={() => setFormOpen(false)} className="mb-4 text-sm text-gray-700">
                    ← Back to list
                </button>
                <CreateProductForm onSave={() => setFormOpen(false)} />
            </div>
        );
    }

    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Products</h1>
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                    <BiPlus size={16} /> New
                </button>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                {/* Header row: 7 columns */}
                <div className="grid grid-cols-7 place-items-center bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {products.map(p => (
                    <div key={p.id} className="grid grid-cols-7 place-items-center py-2 border-b">
                        <span>{p.id}</span>
                        <span>{p.name}</span>
                        {/*<span>{p.description}</span>*/}
                        <span>{p.gender}</span>
                        <span>{p.productType.name}</span>
                        <span>{p.onSale ? <BiCheckboxChecked /> : <BiX />}</span>
                        <div className="flex gap-2">
                            <FaEdit className="cursor-pointer" onClick={() => navigate(`/product/edit/${p.id}`)} />
                            <MdDeleteForever className="cursor-pointer" onClick={() => deleteProduct(p.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {products.map(p => (
                    <div key={p.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {p.id}</p>
                        <p><strong>Name:</strong> {p.name}</p>
                        {/*<p><strong>Description:</strong> {p.description}</p>*/}
                        <p><strong>Gender:</strong> {p.gender}</p>
                        <p><strong>Type:</strong> {p.productType.name}</p>
                        <p><strong>On Sale:</strong> {p.onSale ? 'Yes' : 'No'}</p>
                        <div className="mt-2 flex gap-2">
                            <button onClick={() => navigate(`/product/edit/${p.id}`)} className="text-sm underline">
                                Edit
                            </button>
                            <button onClick={() => deleteProduct(p.id)} className="text-sm underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}