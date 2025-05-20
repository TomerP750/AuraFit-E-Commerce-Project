// src/components/NavbarSearchDrawer/NavbarSearchDrawer.tsx
import "./NavbarSearchDrawer.css";
import { JSX, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../../assets/logo.png";
import { SearchDTO } from "../../../Models/DTOS/SearchDTO";
import { ProductVariantDTO } from "../../../Models/DTOS/ProductVariantDTO";
import displayService from "../../../Services/DisplayService";

import { useNavigate } from "react-router-dom";
import {VariantMiniCard} from "../VariantMiniCard/VariantMiniCard.tsx";
import {useDebounce} from "../../../Redux/hooks.ts";

interface NavbarSearchDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function NavbarSearchDrawer({open, setOpen,}: NavbarSearchDrawerProps): JSX.Element {
    const [crit, setCrit] = useState<SearchDTO>({
        query: "",
        page: 0,
        size: 5,
    });
    const debouncedCrit = useDebounce(crit, 400);
    const [results, setResults] = useState<ProductVariantDTO[]>([]);
    const navigate = useNavigate();

    // live‐search effect
    useEffect(() => {
        if (!debouncedCrit.query.trim()) {
            setResults([]);
            return;
        }

        displayService.searchVariants(debouncedCrit)
            .then(res => {
                console.log("Res:", res)
                setResults(res)
            })
            .catch(console.error);
    }, [debouncedCrit]);

    // lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCrit((c) => ({ ...c, query: e.target.value }));
    };

    const handleSeeAll = () => {
        setOpen(false);
        navigate(`/search?query=${encodeURIComponent(crit.query.trim())}`);
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed inset-x-0 top-0 z-50 bg-white shadow-md h-80 cursor-default"
                        >
                            <div className="flex flex-col h-full px-6 py-5 gap-4">
                                {/* logo + input + cancel */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="h-10 w-auto object-contain"
                                    />
                                    <input
                                        type="search"
                                        placeholder="Search products…"
                                        className="flex-1 border bg-gray-100 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                        value={crit.query}
                                        onChange={handleInput}
                                    />
                                    <button
                                        onClick={() => setOpen(false)}
                                        aria-label="Close search"
                                        className="text-gray-700 hover:text-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                {/* results */}
                                {crit.query.trim() && (
                                    <div className="flex-1 overflow-y-auto">
                                        {results.length === 0 ? (
                                            <p className="text-sm text-gray-400 px-2 pt-4">
                                                No matches for “{crit.query.trim()}”
                                            </p>
                                        ) : (
                                            <>
                                                <ul className="space-y-1 mb-2">
                                                    {results.map((v) => (
                                                        <li key={v.id}>
                                                            <VariantMiniCard
                                                                variant={v}
                                                                onSelect={() => setOpen(false)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    onClick={handleSeeAll}
                                                    className="text-blue-600 text-sm hover:underline px-2"
                                                >
                                                    See all results&nbsp;→
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
