import { useState, useEffect } from "react";
import "../styles/pages/Home.css";
import Background from "../components/Background";
import Columns from "../components/Columns";

const Home = () => {
    return (
        <main className="home-wrapper">
            {/* <Background /> */}
            <Columns />
            {/* <div className="column">
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
            <div className="column"></div> */}
        </main>
    )
}

export default Home