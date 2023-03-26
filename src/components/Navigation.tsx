import { useContext } from 'react'
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

const Navigation = () => {
    const { artistPagination, artworksPagination, setNavShown, navShown } = useContext(artworkContext) as IArtworkContext;
    return (
        <nav>
            <div className="link-wrapper">
                <Link to="/" onClick={e => setNavShown(!navShown)}>Home</Link>
                <Link to={`artists/${artistPagination}`} onClick={e => setNavShown(!navShown)}>Artists</Link>
                <Link to={`artworks/${artworksPagination}`} onClick={e => setNavShown(!navShown)}>Artworks</Link>
            </div>
        </nav>
    )
}

export default Navigation