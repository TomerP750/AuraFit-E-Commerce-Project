import "./PromotionCrud.css";
import {JSX, useEffect, useState} from "react";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";
import {Promotion} from "../../../../Models/Promotion.ts";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {CreatePromotionForm} from "../../CreateForms/CreatePromotionForm/CreatePromotionForm.tsx";
import {
    CreatePromotionByProductsForm
} from "../../CreateForms/CreatePromotionByProductsForm/CreatePromotionByProductsForm.tsx";

// import { UpdatePromotionForm } from "../../UpdateForms/PromotionUpdateForm/PromotionUpdateForm.tsx";

export function PromotionCrud(): JSX.Element {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [formTypeOpen, setFormTypeOpen] = useState<"none" | "create" | "update" | "byProduct">("none");
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        adminService.allPromotions()
            .then(promotions => setPromotions(promotions))
            .catch(error => toast.error(error.response.data))
    }, []);

    // // Delete promotion by id
    // const deletePromotion = (id: number) => {
    //     if (confirm("Delete promotion?")) {
    //         adminService
    //             .deletePromotion(id)
    //             .then(() => {
    //                 setPromotions((prev) => prev.filter((p) => p.id !== id));
    //                 toast.success("Promotion deleted");
    //             })
    //             .catch((err) => toast.error(err.response?.data || err.message));
    //     }
    // };

    const fields: string[] = [
        "Id",
        "Name",
        "Discount %",
        "Start Time",
        "End Time",
        "Active",
        "Variant Id",
        "Actions",
    ];

    if (formTypeOpen === "create") {
        return (
            <div className="p-4 w-full">
                <button
                    onClick={() => setFormTypeOpen("none")}
                    className="mb-4 text-sm text-gray-700"
                >
                    ← Back to list
                </button>
                <CreatePromotionForm
                    onSave={() => {
                        setFormTypeOpen("none");
                    }}
                />
            </div>
        );
    }

    if (formTypeOpen === "byProduct") {
        return (
            <div className="p-4 w-full">
                <button
                    onClick={() => setFormTypeOpen("none")}
                    className="mb-4 text-sm text-gray-700"
                >
                    ← Back to list
                </button>
                <CreatePromotionByProductsForm
                    onSave={() => {
                        setFormTypeOpen("none");
                    }}
                />
            </div>
        );
    }

    if (formTypeOpen === "update" && selectedPromotion) {
        return (
            <div className="p-4 w-full">
                <button
                    onClick={() => setFormTypeOpen("none")}
                    className="mb-4 text-sm text-gray-700"
                >
                    ← Back to list
                </button>
                {/*<UpdatePromotionForm*/}
                {/*    promotion={selectedPromotion}*/}
                {/*    onSave={() => {*/}
                {/*        setFormTypeOpen("none");*/}
                {/*        fetchPromotions();*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        );
    }

    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Promotions</h1>
                <div className={"flex gap-3"}>
                    <button
                        onClick={() => setFormTypeOpen("create")}
                        className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1 cursor-pointer"
                    >
                        <BiPlus size={16}/> New
                    </button>
                    <button
                        onClick={() => setFormTypeOpen("byProduct")}
                        className="bg-gray-800 text-white py-1 px-3 rounded flex items-center gap-1 cursor-pointer"
                    >
                        <BiPlus size={16}/> New By Product
                    </button>
                </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:block">
                {/* Header row */}
                <div className="grid grid-cols-8 place-items-center bg-gray-100 py-2">
                    {fields.map((field, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-700">
              {field}
            </span>
                    ))}
                </div>
                {promotions.map((promo) => (
                    <div
                        key={promo.id}
                        className="grid grid-cols-8 place-items-center py-2 border-b"
                    >
                        <span>{promo.id}</span>
                        <span>{promo.name}</span>
                        <span>{promo.discountPercent}</span>
                        <span>{new Date(promo.startTime).toLocaleString()}</span>
                        <span>{new Date(promo.endTime).toLocaleString()}</span>
                        <span>{promo.isActive ? 'Yes' : 'No'}</span>
                        <span>{promo.productVariant.id}</span>
                        <div className="flex gap-3 font-light">
                            <p
                                className="cursor-pointer hover:font-medium"
                                onClick={() => {
                                    setSelectedPromotion(promo);
                                    setFormTypeOpen("update");
                                }}
                            >
                                Edit
                            </p>
                            <p
                                className="cursor-pointer hover:font-medium"
                                // onClick={() => deletePromotion(promo.id)}
                            >
                                Delete
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {promotions.map((promo) => (
                    <div key={promo.id} className="p-4 border rounded shadow-sm">
                        <p><strong>Id:</strong> {promo.id}</p>
                        <p><strong>Name:</strong> {promo.name}</p>
                        <p><strong>Discount:</strong> {promo.discountPercent}%</p>
                        <p><strong>Start:</strong> {new Date(promo.startTime).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(promo.endTime).toLocaleString()}</p>
                        <p><strong>Active:</strong> {promo.isActive ? 'Yes' : 'No'}</p>
                        <p><strong>Variant Id:</strong> {promo.productVariant.id}</p>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => {
                                    setSelectedPromotion(promo);
                                    setFormTypeOpen("update");
                                }}
                                className="text-sm underline"
                            >
                                Edit
                            </button>
                            <button
                                // onClick={() => deletePromotion(promo.id)}
                                className="text-sm underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
