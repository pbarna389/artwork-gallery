import { useContext } from 'react';
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

import "../styles/components/Navbar.css"

const Navbar = () => {
    const { artistPagination } = useContext(artworkContext) as IArtworkContext;

    return (
        <nav>
            <Link to="/">Home</Link>
            <div>
                <Link to={`artists/${artistPagination}`}>Artists</Link>
                <Link to="artworks">Artworks</Link>
            </div>
        </nav>
    )
}

export default Navbar