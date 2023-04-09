import { useContext } from 'react'
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

const Navigation = () => {
    const { artistPagination, artworksPagination, setNavShown, navShown } = useContext(artworkContext) as IArtworkContext;
    return (
        <nav className={`${navShown ? "shown" : "not-shown"}`}>
            <div className={`link-wrapper`}>
                <Link to="/" onClick={e => setNavShown(!navShown)}>Home</Link>
                <div className="helper"></div>
                <Link to={`artists/${artistPagination}`} onClick={e => setNavShown(!navShown)}>Artists</Link>
                <div className="helper"></div>
                <Link to={`artworks/${artworksPagination}`} onClick={e => setNavShown(!navShown)}>Artworks</Link>
                <div className="helper"></div>
                <Link to={`/profile`} onClick={e => setNavShown(!navShown)}>Profile</Link>
                <div className="helper"></div>
            </div>
        </nav>
    )
}

export default Navigation