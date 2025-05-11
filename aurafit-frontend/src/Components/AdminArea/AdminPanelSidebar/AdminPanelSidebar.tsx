import "./AdminPanelSidebar.css";
import {JSX} from "react";


export type PanelKey =
    | "productCrud"
    | "variantCrud"
    | "categoryCrud"
    | "sizeCrud"
    | "materialCrud"
    | "fitTypeCrud"
    | "productTypeCrud"

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
                <li className={itemClass("productCrud")} onClick={() => onSelect("productCrud")}>Products</li>
                <li className={itemClass("variantCrud")} onClick={() => onSelect("variantCrud")}>Product Variants</li>
                <li className={itemClass("categoryCrud")} onClick={() => onSelect("categoryCrud")}>Categories
                </li>
                <li className={itemClass("productTypeCrud")} onClick={() => onSelect("productTypeCrud")}>
                    Product Types
                </li>
                <li className={itemClass("sizeCrud")} onClick={() => onSelect("sizeCrud")}>Sizes</li>
                <li className={itemClass("materialCrud")} onClick={() => onSelect("materialCrud")}>Materials
                </li>
                <li className={itemClass("fitTypeCrud")} onClick={() => onSelect("fitTypeCrud")}>Fit Types
                </li>

            </ul>
        </div>
    );
}

