import "./WishlistCard.css";
import {WishlistItem} from "../../../Models/WishlistItem.ts";
import {JSX, useState} from "react";


interface WishlistCardProps {
    wishlistItem: WishlistItem;
}
export function WishlistCard({wishlistItem}: WishlistCardProps): JSX.Element {

    const [hover, setHover] = useState(false);

    return (
        <div className="flex w-[300px]">
		    {/*	Image*/}
            <div onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
                 className={`relative bg-grey-700 aspect-square ${hover ? "bg-grey-700/50" : ""}`}>
                {hover && <div className={"flex items-center justify-between"}>
                    <button>Go To Product</button>
                    <button>Add To Cart</button>
                </div>}
            </div>
        </div>
    );
}
