import "./AdminPanelSidebar.css";
import {JSX} from "react";


export type PanelKey =
    | "createProduct"
    | "createPV"
    | "createCategory"
    | "createSize"
    | "createMaterial"
    | "createFitType"
    | "createSubCategory"

interface AdminPanelSidebarProps {
    active: PanelKey;
    onSelect: (key: PanelKey) => void;
}

export function AdminPanelSidebar({ active, onSelect }: AdminPanelSidebarProps): JSX.Element {
    const baseClasses = "border-t border-l border-b border-black w-full py-2 text-center cursor-pointer";

    const itemClass = (key: PanelKey) =>
        `${baseClasses} ${active === key ? "bg-gray-200 font-bold scale-110 mx-3" : ""}`;

    return (
        <div className="w-60 border-r border-black h-full">
            <ul className="flex flex-col w-full items-end text-lg gap-5 mt-10">
                <li className={itemClass("createProduct")} onClick={() => onSelect("createProduct")}>Create Product</li>
                <li className={itemClass("createPV")} onClick={() => onSelect("createPV")}>Create Product Variant</li>
                <li className={itemClass("createCategory")} onClick={() => onSelect("createCategory")}>Create Category
                </li>
                <li className={itemClass("createSubCategory")} onClick={() => onSelect("createSubCategory")}>Create
                    SubCategory
                </li>
                <li className={itemClass("createSize")} onClick={() => onSelect("createSize")}>Create Size</li>
                <li className={itemClass("createMaterial")} onClick={() => onSelect("createMaterial")}>Create Material
                </li>
                <li className={itemClass("createFitType")} onClick={() => onSelect("createFitType")}>Create FitType
                </li>

            </ul>
        </div>
    );
}

