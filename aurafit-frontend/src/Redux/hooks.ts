import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState} from "./store.ts";
import {useEffect, useState} from "react";

type DispatchFunction = () => AppDispatch;

export const useUserDispatch: DispatchFunction = useDispatch;
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;



export function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}


