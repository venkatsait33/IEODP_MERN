import { useEffect } from "react";

const SCROLL_KEY = "app-scroll-position";

export const useScrollRestoration = () => {
    useEffect(() => {
        const savedPosition = sessionStorage.getItem(SCROLL_KEY);

        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }

        const handleScroll = () => {
            sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
};
