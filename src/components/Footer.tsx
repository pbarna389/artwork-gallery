import { useState, useRef, MutableRefObject } from "react";
import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import "../styles/components/Footer.css";
const Footer = () => {
    const [visible, setVisible] = useState<boolean>(false);
    // const elementRef01: MutableRefObject<HTMLElement | any> = useRef();
    // const [footerRef] = useInterSectionObserver(setVisible, elementRef01)

    return (
        <footer>
            <span>©2023 Barnabás Papp </span>
        </footer >)
}

export default Footer;