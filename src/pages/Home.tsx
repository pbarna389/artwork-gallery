import { useState, useEffect } from "react";
import "../styles/pages/Home.css";
import picture from "../assets/The_Taking_of_Christ-Caravaggio.jpg";

const Home = () => {
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
        <main className="home-wrapper">
            <div className="background">
                <div className={`picture ${!bgLoad ? "not-loaded" : "loaded"}`} style={{ backgroundImage: `url(${picture})` }}></div>
            </div>
            <div className="column">
                <div className="helper"></div>
            </div>
            <div className="column">
                <div className="helper"></div>
            </div>
            <div className="column">
                <div className="helper"></div>
            </div>
            <div className="column">
                <div className="helper"></div>
            </div>
            <div className="column"></div>
        </main>
    )
}

export default Home