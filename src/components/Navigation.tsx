import { useContext } from 'react'
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

import Goya from "../assets/goya.jpg";
import Greco from "../assets/greco.jpg";
import Michelangelo from "../assets/michelangelo.jpg";
import Dali from "../assets/dali.jpg";

const Navigation = () => {
    const { artistPagination, artworksPagination, setNavShown, navShown } = useContext(artworkContext) as IArtworkContext;
    return (
        <nav className={`${navShown ? "shown" : "not-shown"}`}>
            <div className={`link-wrapper`}>
                <Link to="/" onClick={e => setNavShown(!navShown)}>
                    <p>Home</p>
                    <div>
                        <img src={Greco} alt=""></img>
                    </div>
                </Link>
                <div className="helper"></div>
                <Link to={`artists/${artistPagination}`} onClick={e => setNavShown(!navShown)}>
                    <p>Artists</p>
                    <div>
                        <img src={Michelangelo} alt=""></img>
                    </div>
                </Link>
                <div className="helper"></div>
                <Link to={`artworks/${artworksPagination}`} onClick={e => setNavShown(!navShown)}>
                    <p>
                        Artworks
                    </p>
                    <div>
                        <img src={Goya} alt=""></img>
                    </div>
                </Link>
                <div className="helper"></div>
                <Link to={`/profile`} onClick={e => setNavShown(!navShown)}>
                    <p>Profile</p>
                    <div>
                        <img src={Dali} alt=""></img>
                    </div>
                </Link>
                <div className="helper"></div>
            </div>
        </nav>
    )
}

export default Navigation