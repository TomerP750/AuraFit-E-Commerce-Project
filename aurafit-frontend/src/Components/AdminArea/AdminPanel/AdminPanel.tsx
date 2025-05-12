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
import {ProductVariantCrud} from "../Cruds/ProductVariantCrud/ProductVariantCrud.tsx";
import {FitTypeCrud} from "../Cruds/FitTypeCrud/FitTypeCrud.tsx";
import {MaterialCrud} from "../Cruds/MaterialCrud/MaterialCrud.tsx";
import {SizeCrud} from "../Cruds/SizeCrud/SizeCrud.tsx";
import {CategoryCrud} from "../Cruds/CategoryCrud/CategoryCrud.tsx";
import {UserCrud} from "../Cruds/UserCrud/UserCrud.tsx";
import {PromotionCrud} from "../Cruds/PromotionCrud/PromotionCrud.tsx";
import {ColorCrud} from "../Cruds/ColorCrud/ColorCrud.tsx";

export function AdminPanel(): JSX.Element {

    const [activePanel, setActivePanel] = useState<"colorCrud" | "promotionCrud" | "userCrud" | "productCrud" | "variantCrud" | "categoryCrud" | "sizeCrud" | "materialCrud" | "productTypeCrud" | "fitTypeCrud">("productCrud");

    const renderContent = () => {
        switch (activePanel) {
            case "productCrud":
                return <ProductCrud/>;
            case "variantCrud":
                return <ProductVariantCrud/>;
            case "categoryCrud":
                return <CategoryCrud/>;
            case "sizeCrud":
                return <SizeCrud/>;
            case "materialCrud":
                return <MaterialCrud/>;
            case "fitTypeCrud":
                return <FitTypeCrud/>;
            case "productTypeCrud":
                return <ProductTypeCrud/>;
            case "userCrud":
                return <UserCrud/>;
            case "promotionCrud":
                return <PromotionCrud/>;
            case "colorCrud":
                return <ColorCrud/>;
            default:
                return null;
        }
    };
    return (
        <div className="flex justify-start bg-neutral-100 min-h-screen">
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


