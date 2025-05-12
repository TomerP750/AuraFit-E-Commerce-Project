import "./ProductPage.css";
import {JSX, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {TitlePriceReviews} from "../TitlePriceReviews/TitlePriceReviews.tsx";
import {Colors} from "../Colors/Colors.tsx";
import {Sizes} from "../Sizes/Sizes.tsx";
import {Description} from "../Description/Description.tsx";
import {Buttons} from "../Buttons/Buttons.tsx";
import {FabricAndCare} from "../FabricAndCare/FabricAndCare.tsx";
import {Images} from "../Images/Images.tsx";
import {ProductReviews} from "../../ProductReviews/ProductReviews.tsx";
import adminService from "../../../../Services/AdminService.ts";
import {Product} from "../../../../Models/Product.ts";
import {toast} from "react-toastify";
import {ProductVariant} from "../../../../Models/ProductVariant.ts";
import displayService from "../../../../Services/DisplayService.ts";

export function ProductPage(): JSX.Element {

    // const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [variant, setVariant] = useState<ProductVariant>();
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    const params = useParams();
    const id = +params.id!;


    useEffect(() => {
        displayService.getOneProductVariant(id)
            .then(res => {
                setVariant(res)
            })
            .catch(err => {
                toast.error(err.response.data)
            });

    },[id])

    if (!variant) {
        return <div className="text-center py-20">Loading product…</div>;
    }

    return (
        <div className="w-full flex flex-col items-center gap-20 py-40">
            <div className="w-4/5 flex flex-col items-start mt-6 gap-5">
                {/* navigation links */}
                <div className="flex justify-start gap-5">
                    <NavLink to={"/"}>Home</NavLink>
                    <p className="text-gray-400">/</p>
                    <NavLink to={"/"}>Men</NavLink>
                    <p className="text-gray-400">/</p>
                    <NavLink to={"/"}>{variant.product.name}</NavLink>
                </div>

                {/* Main section */}
                <section className="w-full flex flex-col lg:flex-row justify-between items-start gap-5">

                    {/* Left: images */}
                    <Images/>

                    {/* Right section */}
                    <aside className="flex-1 flex flex-col items-start gap-20">
                        <div className="w-full flex flex-col gap-5">
                            <TitlePriceReviews variant={variant} />
                            <Colors variant={variant}/>
                            <Sizes variant={variant}/>
                            <Buttons onWishlistClick={() => setAddedToWishlist(!addedToWishlist)}
                                     isWishlisted={addedToWishlist}/>
                        </div>

                        <div className="flex flex-col w-full gap-10">
                            <Description variant={variant} />
                            <FabricAndCare/>
                        </div>
                    </aside>
                </section>
            </div>
            {/*Reviews Section*/}
            <section className={"flex flex-col w-full items-center gap-20"}>
                <p className={"text-4xl font-medium"}>Reviews</p>
                {/*<ProductReviews product={variant!.product} />*/}
            </section>
        </div>
    );
}

// <div className="flex flex-col gap-2">
//     <p>Fabric & Care</p>
//     <ul className="flex flex-col text-sm gap-1 ">
//         <li>Material: 100% Cotton</li>
//         <li>Machine Wash only</li>
//     </ul>
// </div>