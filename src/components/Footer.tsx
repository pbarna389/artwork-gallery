import { useState } from "react";
import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import "../styles/components/Footer.css";
const Footer = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [elementRef] = useInterSectionObserver(setVisible)

    return (
        <footer ref={elementRef && elementRef} className={`${visible ? "show" : ""}`}>
            <span>©2023 Barnabás Papp </span>
        </footer>)
}

export default Footer;