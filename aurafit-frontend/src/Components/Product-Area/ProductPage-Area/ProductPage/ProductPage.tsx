import "./ProductPage.css";
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";
import {TitlePriceReviews} from "../TitlePriceReviews/TitlePriceReviews.tsx";
import {Colors} from "../Colors/Colors.tsx";
import {Sizes} from "../Sizes/Sizes.tsx";
import {Description} from "../Description/Description.tsx";
import {Buttons} from "../Buttons/Buttons.tsx";
import {FabricAndCare} from "../FabricAndCare/FabricAndCare.tsx";
import {Images} from "../Images/Images.tsx";

export function ProductPage(): JSX.Element {

    // const [addedToWishlist, setAddedToWishlist] = useState(false);

    const [addedToWishlist, setAddedToWishlist] = useState(false);

    return (
        <div className="w-full flex flex-col items-center gap-20">
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
                <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-5">

                    {/* Left: images */}
                    <Images/>

                    {/* Right section */}
                    <aside className="flex-1 flex flex-col items-start gap-20">
                        <div className="w-full flex flex-col gap-5">
                            <TitlePriceReviews/>
                            <Colors/>
                            <Sizes/>
                            <Buttons onWishlistClick={() => setAddedToWishlist(!addedToWishlist)}
                                     isWishlisted={addedToWishlist}/>
                        </div>

                        <div className="flex flex-col w-full gap-10">
                            <Description/>
                            <FabricAndCare/>
                        </div>
                    </aside>
                </section>
            </div>
            {/*Reviews Section*/}
            <section className={"flex flex-col"}>
                <p className={"text-4xl font-medium"}>Reviews</p>
            </section>
        </div>
    );
}


{/*    /!*Title + Price + reviews*!/*/
}
{/*    <div className="w-full flex justify-between flex-col gap-1">*/
}
{/*        <div className="flex justify-between">*/
}
{/*        <p className="text-3xl">Basic Tee</p>*/
}
{/*        <p className={"text-3xl"}>$35</p>*/
}
{/*        </div>*/
}

{/*        /!*    Reviews*!/*/
}
{/*        <div className="flex justify-between">*/
}
{/*            <div className="flex items-center gap-1">*/
}
{/*                <FaStar/>*/
}
{/*                <FaStar/>*/
}
{/*                <FaStar/>*/
}
{/*                <FaStar/>*/
}
{/*                <FaStar/>*/
}
{/*                <p className={"ml-4"}>See all 100 reviews</p>*/
}
{/*            </div>*/
}
{/*        </div>*/
}
{/*    </div>*/
}

{/*    /!*    Colors Row*!/*/
}
{/*    <div className="flex flex-col gap-1">*/
}
{/*        <p>Color</p>*/
}
{/*        <div className="flex items-center gap-3">*/
}
{/*            <div className="bg-black w-[40px] h-[40px] rounded-full"/>*/
}
{/*            <div className="bg-blue-900 w-[40px] h-[40px] rounded-full"/>*/
}
{/*        </div>*/
}
{/*    </div>*/
}

{/*    /!*    Sizes *!/*/
}
{/*    <div className="w-full flex flex-col gap-4">*/
}
{/*        <div className="flex items-center justify-between">*/
}
{/*            <p>Size</p>*/
}
{/*            <p>Sizing chart</p>*/
}
{/*        </div>*/
}
{/*        <div className="flex gap-3 items-center">*/
}
{/*            <button className={"border border-gray-300 px-5 py-1"}>S</button>*/
}
{/*            <button className={"border border-gray-300 px-5 py-1"}>M</button>*/
}
{/*            <button className={"border border-gray-300 px-5 py-1"}>L</button>*/
}
{/*            <button className={"border border-gray-300 px-5 py-1 "}>XL</button>*/
}
{/*            <button className={"border border-gray-300 px-5 py-1"}>XXL</button>*/
}
{/*        </div>*/
}
{/*    </div>*/
}

{/*    /!*    Add To cart button*!/*/
}
{/*    <div className="w-full flex justify-between items-center">*/
}
{/*        <button className={"bg-black w-9/10 text-white py-3 rounded-lg"}>Add To Cart</button>*/
}
{/*        <button*/
}
{/*            onClick={() => setAddedToWishlist(!addedToWishlist)}*/
}
{/*            className={"cursor-pointer"}>{!addedToWishlist ? <BiHeart className={"size-6"}/> :*/
}
{/*            <AiFillHeart className={"size-6"}/>}*/
}
{/*        </button>*/
}
{/*    </div>*/
}

{/*    /!*    Description*!/*/
}
{/*    <div className="flex flex-col gap-2">*/
}
{/*        <p>Descrption</p>*/
}
{/*        <p className={"text-gray-500"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/
}
{/*            Accusamus adipisci aperiam eum expedita, explicabo fugit id laudantium magnam molestiae*/
}
{/*            nulla, quaerat quam quis, recusandae repellat sit sunt tempora temporibus vel.</p>*/
}
{/*    </div>*/
}
// <div className="flex flex-col gap-2">
//     <p>Fabric & Care</p>
//     <ul className="flex flex-col text-sm gap-1 ">
//         <li>Material: 100% Cotton</li>
//         <li>Machine Wash only</li>
//     </ul>
// </div>