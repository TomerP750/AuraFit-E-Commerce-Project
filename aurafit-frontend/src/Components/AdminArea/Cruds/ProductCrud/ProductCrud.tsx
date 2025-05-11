import "./ProductCrud.css";
import {JSX} from "react";
import {CreateProductForm} from "../../CreateForms/CreateProductForm/CreateProductForm.tsx";

export function ProductCrud(): JSX.Element {
    return (
        <div className="ProductCrud">
            <CreateProductForm/>
        </div>
    );
}
