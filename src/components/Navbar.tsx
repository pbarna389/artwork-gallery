import { useContext } from 'react';
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';
import Menu from './Menu';
import Logo from './Logo';
import Searchbar from './Searchbar';
import Navigation from './Navigation';

import "../styles/components/Navbar.css"

const Navbar = () => {

    const { navShown } = useContext(artworkContext) as IArtworkContext;

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
            <Navigation />
        </header>
    )
}

export default Navbar