import "./AdminPanel.css";
import {JSX, useState} from "react";
import {AdminPanelSidebar} from "../AdminPanelSidebar/AdminPanelSidebar.tsx";
import {CreateProductVariantForm} from "../CreateForms/CreateProductVariantForm/CreateProductVariantForm.tsx";
import {CreateCategoryForm} from "../CreateForms/CreateCategoryForm/CreateCategoryForm.tsx";
import {CreateSizeForm} from "../CreateForms/CreateSizeForm/CreateSizeForm.tsx";
import {CreateMaterialForm} from "../CreateForms/CreateMaterialForm/CreateMaterialForm.tsx";
import {CreateFitTypeForm} from "../CreateForms/CreateFitTypeForm/CreateFitTypeForm.tsx";
import {ProductTypeCrud} from "../Cruds/ProductTypeCrud/ProductTypeCrud.tsx";
import {FaHome, FaMoon, FaSun} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {ProductCrud} from "../Cruds/ProductCrud/ProductCrud.tsx";

export function AdminPanel(): JSX.Element {

    const [activePanel, setActivePanel] = useState<"productCrud" | "variantCrud" | "categoryCrud" | "sizeCrud" | "materialCrud" | "productTypeCrud" | "fitTypeCrud">("productCrud");

    const renderContent = () => {
        switch (activePanel) {
            case "productCrud":
                return <ProductCrud/>;
            case "variantCrud":
                return <CreateProductVariantForm/>;
            case "categoryCrud":
                return <CreateCategoryForm/>;
            case "sizeCrud":
                return <CreateSizeForm/>;
            case "materialCrud":
                return <CreateMaterialForm/>;
            case "fitTypeCrud":
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
                {/*Header*/}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <NavLink to={"/"}><FaHome size={30} className={"cursor-pointer"}/></NavLink>
                        <p className={"text-5xl"}>Admin Panel</p>
                    </div>
                    <div className="flex gap-3">
                        <FaSun size={20}/>
                        <FaMoon size={20}/>
                    </div>
                </div>
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


