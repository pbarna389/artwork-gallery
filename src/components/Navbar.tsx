import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';
import Menu from './Menu';
import Logo from './Logo';
import Searchbar from './Searchbar';

import "../styles/components/Navbar.css"

const Navbar = () => {
    const [navShown, setNavShown] = useState<boolean>(false);
    const { artistPagination, artworksPagination } = useContext(artworkContext) as IArtworkContext;

    return (
        <header>
            <div className="toolbar">
                <div className="toolbar-options">
                    <Menu />
                    <Logo />
                    <Searchbar />
                </div>
                <div className="toolbar-helper"></div>
            </div>
            {
                navShown ?
                    <nav>
                        <div>
                            <Link to="/">Home</Link>
                            <Link to={`artists/${artistPagination}`}>Artists</Link>
                            <Link to={`artworks/${artworksPagination}`}>Artworks</Link>
                        </div>
                    </nav>
                    : null
            }
        </header>
    )
}

export default Navbar