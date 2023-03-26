import { useContext } from 'react';
import { IArtworkContext } from '../@types/artwork';
import { artworkContext } from '../context/ArtworkContext';

import "../styles/components/Menu.css";

const Menu = () => {
    const { navShown, setNavShown } = useContext(artworkContext) as IArtworkContext;

    return (
        <div className={`hamburger-menu ${navShown ? "active" : ""}`} onClick={e => setNavShown(!navShown)}>
        </div >
    )
}

export default Menu