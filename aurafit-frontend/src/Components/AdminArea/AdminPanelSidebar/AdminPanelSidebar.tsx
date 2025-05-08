import "./AdminPanelSidebar.css";
import {JSX} from "react";

export function AdminPanelSidebar(): JSX.Element {

    const sidebarItem = "border-t border-l border-b border-black w-full py-2 text-center cursor-pointer"


    return (
        <div className="w-60 border-r border-black h-full">

            <ul className="flex flex-col w-full items-end text-lg gap-5 mt-10">
                <li className={`${sidebarItem}`}>Create Product</li>
                <li className={`${sidebarItem}`}>Create Product Variant</li>
                <li className={`${sidebarItem}`}>Create Category</li>
                <li className={`${sidebarItem}`}>Create Size</li>
                <li className={`${sidebarItem}`}>Create Material</li>
            </ul>
        </div>
    );
}
