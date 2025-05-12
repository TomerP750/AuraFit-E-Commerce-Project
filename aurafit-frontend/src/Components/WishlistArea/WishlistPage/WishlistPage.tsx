import "./WishlistPage.css";
import {JSX, useEffect, useState} from "react";
import {WishlistItem} from "../../../Models/WishlistItem.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import {toast} from "react-toastify";
import {WishlistCard} from "../WishlistCard/WishlistCard.tsx";

export function WishlistPage(): JSX.Element {

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        wishlistService.allWishlistItems()
            .then(res => setWishlistItems(res))
            .catch(err => toast.error(err));
    }, [])

    if (!wishlistItems) {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="flex w-4/5 justify-center mt-20">
                {/*    Left section*/}
                <div className="flex flex-col">
                    <p className={"text-4xl font-medium"}>Your Wishlist</p>
                    <div className="grid grid-cols-5">
                        {wishlistItems.map(w => <WishlistCard key={w.id} wishlistItem={w}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
