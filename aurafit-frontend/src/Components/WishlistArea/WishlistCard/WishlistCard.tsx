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
            <div
                onMouseOver={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
                className="bg-grey-700 aspect-square "/>
        </div>
    );
}
