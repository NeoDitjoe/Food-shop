import { useEffect } from "react";

const ScrollToTop = () => {

    useEffect(() => {
        // first way..not working
        window.scrollTo(0, 0);

        // second way..still not working
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, []);

    return null;
};

export default ScrollToTop;