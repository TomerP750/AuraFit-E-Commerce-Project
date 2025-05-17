// src/hooks/useScrollUpTrigger.ts
import { useState, useEffect } from 'react';

export function useScrollUpTrigger(offset = 50) {
    const [show, setShow] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastY && currentY > offset) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastY(currentY);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastY, offset]);

    return show;
}
