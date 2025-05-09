import "./AdminPanelSidebar.css";
import {JSX} from "react";


export type PanelKey =
    | "createProduct"
    | "createPV"
    | "createCategory"
    | "createSize"
    | "createMaterial"
    | "createFitType"
    | "subCategoryCrud"

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
                <li className={itemClass("createProduct")} onClick={() => onSelect("createProduct")}>Products</li>
                <li className={itemClass("createPV")} onClick={() => onSelect("createPV")}>Product Variants</li>
                <li className={itemClass("createCategory")} onClick={() => onSelect("createCategory")}>Categories
                </li>
                <li className={itemClass("subCategoryCrud")} onClick={() => onSelect("subCategoryCrud")}>
                    SubCategories
                </li>
                <li className={itemClass("createSize")} onClick={() => onSelect("createSize")}>Sizes</li>
                <li className={itemClass("createMaterial")} onClick={() => onSelect("createMaterial")}>Materials
                </li>
                <li className={itemClass("createFitType")} onClick={() => onSelect("createFitType")}>FitTypes
                </li>

            </ul>
        </div>
    );
}

