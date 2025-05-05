import { JSX } from "react";
import {
    BiLogoFacebook,
    BiLogoInstagram, BiLogoTiktok,
    BiLogoYoutube,
} from "react-icons/bi";
import {NavLink} from "react-router-dom";

const linkSections = [
    {
        title: "Company",
        links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
        title: "Support",
        links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
    },
    {
        title: "Shop",
        links: ["Men’s Apparel", "Women’s Apparel", "Accessories", "Gift Cards"],
    },
    {
        title: "Community",
        links: ["Affiliates", "Events", "Forums", "Newsletter"],
    },
];

export function Footer(): JSX.Element {
    return (
        <footer className="bg-gray-50 text-gray-600">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {linkSections.map(({ title, links }) => (
                        <div key={title}>
                            <h3 className="text-lg font-semibold mb-4">{title}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <NavLink
                                            to={""}
                                            className="text-sm hover:text-gray-400 transition-colors duration-150"
                                        >
                                            {link}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="mt-8 md:mt-0">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <NavLink to={""} aria-label="Instagram" className="hover:text-gray-400">
                                <BiLogoInstagram size={28} />
                            </NavLink>
                            <NavLink to={""} aria-label="Facebook" className="hover:text-gray-400">
                                <BiLogoFacebook size={28} />
                            </NavLink>
                            <NavLink to={""} aria-label="YouTube" className="hover:text-gray-400">
                                <BiLogoYoutube size={28} />
                            </NavLink>
                            <NavLink to={""} aria-label="TikTok" className="hover:text-gray-400">
                                <BiLogoTiktok size={28} />
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} AuraFit. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
