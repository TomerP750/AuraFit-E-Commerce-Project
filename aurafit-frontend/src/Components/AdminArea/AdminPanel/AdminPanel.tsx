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
import {SubCategoriesCrud} from "../SubCategoriesCrud/SubCategoriesCrud.tsx";

export function AdminPanel(): JSX.Element {

    const [activePanel, setActivePanel] = useState<"subCategoryCrud" | "createFitType" | "createProduct" | "createPV" | "createCategory" | "createSize" | "createMaterial">("createProduct");

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
            case "subCategoryCrud":
                return <SubCategoriesCrud/>;
            default:
                return null;
        }
    };
    return (
        <div className="flex justify-start bg-neutral-100 h-screen">
            <div className="w-full flex justify-between px-10">

                {/*    Sidebar*/}
                <AdminPanelSidebar active={activePanel} onSelect={setActivePanel}/>
                {/*Forms */}
                <div className="flex-1 h-full">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}


