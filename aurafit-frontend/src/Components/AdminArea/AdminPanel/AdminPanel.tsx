import "./AdminPanel.css";
import {JSX, useState} from "react";
import {AdminPanelSidebar} from "../AdminPanelSidebar/AdminPanelSidebar.tsx";
import {CreateProductForm} from "../CreateProductForm/CreateProductForm.tsx";

export function AdminPanel(): JSX.Element {

    const [activePanel, setActivePanel] = useState<"createProduct" | "createPV" | "createCategory" | "createSize" | "createMaterial">("createProduct");

    const renderContent = () => {
        switch (activePanel) {
            case "createProduct":
                return <CreateProductForm />;
            case "createPV":
                return <div>Create Product Variant</div>;
            case "createCategory":
                return <div>Create Category</div>;
            case "createSize":
                return <div>Create Size</div>;
            case "createMaterial":
                return <div>Create Material</div>;
            default:
                return null;
        }
    };
    return (
        <div className="h-screen flex justify-start bg-neutral-100">
            <div className="w-4/5 flex justify-between px-10">

            {/*    Sidebar*/}
                <AdminPanelSidebar active={activePanel} onSelect={setActivePanel} />
                {/*Forms */}
                <div className="flex-1 h-full">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}


