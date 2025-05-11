import "./ProductTypeCrud.css";
import {BiPencil, BiPlus} from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";
import {JSX, useEffect, useState} from "react";
import {ProductType} from "../../../../Models/ProductType.ts";
import adminService from "../../../../Services/AdminService.ts";
import {toast} from "react-toastify";

export function ProductTypeCrud(): JSX.Element {

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    useEffect(() => {
        adminService.allProductTypes()
            .then((res) => {
                setProductTypes(res)
            })
            .catch((err) => toast.error(err));
    })

    return (
        <div className={"flex flex-col"}>
            <h1 className={"ml-5 text-2xl mt-5"}>Product Type</h1>
            <div className={"flex flex-col mx-5 w-full"}>
                <div className="flex w-full justify-end">
                    <button
                        className={"bg-blue-500 text-white py-2 px-5 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition duration-300"}><BiPlus size={20}/> CREATE NEW</button>
                </div>
                {/*table*/}
                <div className="flex flex-col gap-5">
                    <ul className="flex justify-start gap-20 border-b border-black">
                        <li>Id</li>
                        <li>Name</li>
                    </ul>
                    {productTypes.map(pt => <div className={"flex justify-between gap-20"} key={pt.id}>
                        <div className="flex gap-20">
                            <span>{pt.id}</span>
                            <span>{pt.name}</span>
                        </div>
                        <div className={"flex gap-5"}>
                            <span className={"cursor-pointer"}><BiPencil size={30}/></span>
                            <span className={"cursor-pointer"}><MdDeleteForever size={30}/></span>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}
