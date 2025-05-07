import "./ProductPage.css";
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";
import {BiStar} from "react-icons/bi";

export function ProductPage(): JSX.Element {

    const [descriptionOpened, setDescriptionOpened] = useState(false);


    // return (
    //     <div className="w-full flex flex-col items-center">
    //         <div className="w-3/4 flex flex-col items-start mt-6 gap-5">
    //             {/*navigation links*/}
    //             <div className="flex justify-start gap-5">
    //                 <NavLink to={"/"}>Men</NavLink>
    //                 <p className={"text-gray-400"}>/</p>
    //                 <NavLink to={"/"}>Clothing</NavLink>
    //                 <p className={"text-gray-400"}>/</p>
    //                 <NavLink to={"/"}>T-Shirt</NavLink>
    //             </div>
    //             {/*    Main section*/}
    //             <section className="w-full flex justify-between items-center gap-5">
    //                 {/*    main left section*/}
    //                 <div className="w-1/2 flex flex-col items-center gap-4">
    //                     <div className="grid grid-cols-1">
    //                         <div className="rounded-lg w-[700px] bg-black h-[700px]"/>
    //                     </div>
    //                     <div className=" flex w-[700px] grid-cols-4 gap-5">
    //                         <div className="rounded-lg w-[100px] bg-black h-[100px]"/>
    //                         <div className="rounded-lg w-[100px] bg-black h-[100px]"/>
    //                         <div className="rounded-lg w-[100px] bg-black h-[100px]"/>
    //                         <div className="rounded-lg w-[100px] bg-black h-[100px]"/>
    //                     </div>
    //
    //                 </div>
    //             </section>
    //         </div>
    //     </div>
    // );


    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
                {/* navigation links */}
                <div className="flex justify-start gap-5">
                    <NavLink to={"/"}>Men</NavLink>
                    <p className="text-gray-400">/</p>
                    <NavLink to={"/"}>Clothing</NavLink>
                    <p className="text-gray-400">/</p>
                    <NavLink to={"/"}>T-Shirt</NavLink>
                </div>

                {/* Main section */}
                <section className="w-full flex justify-between items-start gap-5">
                    {/* Left: images */}
                    <div className="w-2/3 flex items-start gap-2">
                        {/* Thumbnail column */}
                        <div className="grid grid-rows-4 gap-2 h-full">
                            <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                            <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                            <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                            <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                        </div>

                        {/* Main placeholder */}
                        <div className="w-full max-w-[700px] aspect-square rounded-lg bg-black"/>
                    </div>


                    {/* Right section */}
                    <aside className="flex-1 flex-col items-start gap-5">
                        {/*Title + Price*/}
                        <div className="flex justify-between">
                            <p className="text-3xl">Basic Tee</p>
                            <p className={"text-3xl"}>$35</p>
                        </div>
                    {/*    Reviews*/}
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <BiStar/>
                                <BiStar/>
                                <BiStar/>
                                <BiStar/>
                                <BiStar/>
                                <p className={"ml-4"}>See all 100 reviews</p>
                            </div>
                        </div>

                    {/*    Colors Row*/}
                        <div className="flex flex-col gap-1">
                            <p>Color</p>
                            <div className="flex items-center gap-3">
                                <div className="bg-black w-[40px] h-[40px] rounded-full"/>
                                <div className="bg-blue-900 w-[40px] h-[40px] rounded-full"/>
                            </div>
                        </div>

                    {/*    Sizes */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <p>Size</p>
                                <p>Sizing chart</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                                <button>XXL</button>
                            </div>
                        </div>

                    {/*    Add To cart button*/}
                        <button className={"bg-black w-full text-white py-3 rounded-lg"}>Add To Cart</button>

                    {/*    Description*/}
                        <div className="flex flex-col gap-2">
                            <p>Descrption</p>
                            <p className={"text-gray-500"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aperiam eum expedita, explicabo fugit id laudantium magnam molestiae nulla, quaerat quam quis, recusandae repellat sit sunt tempora temporibus vel.</p>
                        </div>
                    {/*    Fabric and Care*/}
                        <div className="flex flex-col gap-2">
                            <p>Fabric & Care</p>
                            <ul className="flex flex-col text-sm gap-1 ">
                                <li>Material: 100% Cotton</li>
                                <li>Machine Wash only</li>
                            </ul>
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
}
