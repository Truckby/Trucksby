import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        // console.log("Scroll triggered on route change:", location.pathname);

        const header = document.querySelector("header");
        const offset = header?.offsetHeight || 80;

        if (location.pathname === '/home' || location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    }, [location.key]);

    return null;
};

export default ScrollToTop;
