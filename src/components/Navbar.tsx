import { useContext } from 'react';
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';
import Menu from './Menu';
import Logo from './Logo';
import Searchbar from './Searchbar';
import Navigation from './Navigation';

import "../styles/components/Navbar.css"
import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const { navShown, userDispatch } = useContext(artworkContext) as IArtworkContext;

    const logout = async () => {
        try {
            await signOut(auth);
            userDispatch({ type: "setLogin", payload: false });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <header>
            <div className="toolbar">
                <div className="toolbar-options">
                    <Menu />
                    <Logo />
                    <Searchbar />
                    <button onClick={logout}>Logout</button>
                </div>
                <div className="toolbar-helper"></div>
            </div>
            <Navigation />
        </header>
    )
}

export default Navbar
