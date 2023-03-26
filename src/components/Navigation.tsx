import { useContext } from 'react'
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

const Navigation = () => {
    const { artistPagination, artworksPagination } = useContext(artworkContext) as IArtworkContext;
    return (
        <nav>
            <div className="link-wrapper">
                <Link to="/">Home</Link>
                <Link to={`artists/${artistPagination}`}>Artists</Link>
                <Link to={`artworks/${artworksPagination}`}>Artworks</Link>
            </div>
        </nav>
    )
}

export default Navigation