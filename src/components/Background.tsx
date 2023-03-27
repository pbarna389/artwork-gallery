import { useEffect, useState } from "react";
import picture from "../assets/The_Taking_of_Christ-Caravaggio.jpg";

import "../styles/components/Background.css"

const Background = () => {
    const [bgLoad, setBgLoad] = useState<boolean>(false);
    const [bgTimeout, setBgTimeout] = useState<number>();

    useEffect(() => {
        const id = setTimeout(() => {
            setBgLoad(true)
        }, 500);

        setBgTimeout(id);

        return () => clearTimeout(bgTimeout);
    }, []);
    return (
        <div className="background">
            <div className={`picture ${!bgLoad ? "not-loaded" : "loaded"}`} style={{ backgroundImage: `url(${picture})` }}></div>
        </div>
    )
}

export default Background