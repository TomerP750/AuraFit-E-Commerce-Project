import "./NavbarRight.css";
import {JSX, useState} from "react";
import {BiHeart, BiShoppingBag, BiUser} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {FiMenu, FiSearch} from "react-icons/fi";
import {NavbarSidebar} from "../NavbarSidebar/NavbarSidebar.tsx";

export function NavbarRight(): JSX.Element {

    const [cartItemsCounter, setCartItemsCounter] = useState(1);
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const navbarItem = "size-7 hidden sm:block"
    const [search, setSearch] = useState(false);

    return (
        <div className=" flex justify-between gap-5 cursor-pointer">

            {/*<BiSearch className={`${navbarItem}`}/>*/}

            <FiSearch className={`${navbarItem}`} onClick={()=>setSearch(true)} />

            {/*{search && ""}*/}

            <NavLink to={"/login"}><BiUser className={`${navbarItem}`}/></NavLink>

            <NavLink to={"/wishlist"}><BiHeart className={"size-7"}/></NavLink>

            <NavLink to={"/cart"} className={"relative hidden sm:block"}>
                <BiShoppingBag className={"size-7"}/>
                {cartItemsCounter > 0 && <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartItemsCounter}</p>}
            </NavLink>

            <FiMenu className={"block sm:hidden size-7"} onClick={()=>setSidebarVisible(true)}/>


            {sidebarVisible && <NavbarSidebar sidebarVisible={sidebarVisible} onSidebarClose={()=>setSidebarVisible(false)}/>}

        </div>
    );
}
