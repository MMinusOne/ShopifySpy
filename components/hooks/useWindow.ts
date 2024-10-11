import { useEffect, useState } from "react";

export default function useWindow() {
    const [windowObject, setWindowObject] = useState<Window & typeof globalThis>();

    useEffect(() => {
        setWindowObject(window);
        window.addEventListener('resize', () => {
            setWindowObject(window);
        })
    }, []);

    return window;
}