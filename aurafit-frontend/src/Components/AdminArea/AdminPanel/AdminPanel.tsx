import "./AdminPanel.css";
import {JSX, useState} from "react";
import {AdminPanelSidebar} from "../AdminPanelSidebar/AdminPanelSidebar.tsx";
import {CreateProductForm} from "../CreateProductForm/CreateProductForm.tsx";
import {CreateProductVariantForm} from "../CreateProductVariantForm/CreateProductVariantForm.tsx";
import {CreateCategoryForm} from "../CreateCategoryForm/CreateCategoryForm.tsx";
import {CreateSizeForm} from "../CreateSizeForm/CreateSizeForm.tsx";
import {CreateMaterialForm} from "../CreateMaterialForm/CreateMaterialForm.tsx";
import {CreateFitTypeForm} from "../CreateFitTypeForm/CreateFitTypeForm.tsx";
import {CreateSubCategoryForm} from "../CreateSubCategoryForm/CreateSubCategoryForm.tsx";
import {ProductTypeCrud} from "../ProductTypeCrud/ProductTypeCrud.tsx";

export function AdminPanel(): JSX.Element {

    const [activePanel, setActivePanel] = useState<"productTypeCrud" | "createFitType" | "createProduct" | "createPV" | "createCategory" | "createSize" | "createMaterial">("createProduct");

    const renderContent = () => {
        switch (activePanel) {
            case "createProduct":
                return <CreateProductForm/>;
            case "createPV":
                return <CreateProductVariantForm/>;
            case "createCategory":
                return <CreateCategoryForm/>;
            case "createSize":
                return <CreateSizeForm/>;
            case "createMaterial":
                return <CreateMaterialForm/>;
            case "createFitType":
                return <CreateFitTypeForm/>;
            case "productTypeCrud":
                return <ProductTypeCrud/>;
            default:
                return null;
        }
    };
    return (
        <div className="flex justify-start bg-neutral-100 h-screen">
            <div className="w-full flex flex-col items-start justify-between px-10 gap-5 mt-10">
                <p className={"text-5xl"}>Admin Panel</p>
                {/*    Sidebar*/}
                <div className="flex justify-between w-full h-full border-t border-black">
                    <AdminPanelSidebar active={activePanel} onSelect={setActivePanel}/>
                    {/*Forms */}
                    <div className="flex-1 h-full">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </div>
    );
}


