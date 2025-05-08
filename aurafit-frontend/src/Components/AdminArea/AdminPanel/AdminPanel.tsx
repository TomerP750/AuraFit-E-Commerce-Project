import "./AdminPanel.css";
import {JSX} from "react";
import {AdminPanelSidebar} from "../AdminPanelSidebar/AdminPanelSidebar.tsx";

export function AdminPanel(): JSX.Element {


    return (
        <div className="h-screen flex justify-start bg-neutral-100">
            <div className="w-4/5 flex justify-between px-10">

            {/*    Sidebar*/}
                <AdminPanelSidebar/>
                {/*Forms */}
                <div className="flex-1 h-full">

                </div>

            </div>
        </div>
    );
}


