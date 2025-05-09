import "./SubCategoriesCrud.css";
import {BiPencil, BiPlus} from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";
import {JSX, useEffect, useState} from "react";
import {SubCategory} from "../../../Models/SubCategory.ts";
import adminService from "../../../Services/AdminService.ts";
import {toast} from "react-toastify";

export function SubCategoriesCrud(): JSX.Element {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    useEffect(() => {
        adminService.allSubCategories()
            .then((res) => {
                setSubCategories(res)
            })
            .catch((err) => toast.error(err));
    })

    return (
        <div className={"flex flex-col"}>
            <h1 className={"ml-5 text-2xl"}>Sub Categories</h1>
            <div className={"flex flex-col mx-5 w-4/5"}>
                <div className="flex w-full justify-end">
                    <button className={"bg-blue-500 text-white py-2 px-5 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition duration-300"}><BiPlus size={20}/> CREATE NEW</button>
                </div>
                {/*table*/}
                <div className="flex flex-col gap-5 pl-4">
                    <div className="flex justify-start gap-20 border-b border-black">
                        <p>Id</p>
                        <p>Name</p>
                    </div>
                    {subCategories.map(sc => <div className={"flex justify-between gap-20"} key={sc.id}>
                        <div className="flex gap-20">
                            <span>{sc.id}</span>
                            <span>{sc.name}</span>
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
