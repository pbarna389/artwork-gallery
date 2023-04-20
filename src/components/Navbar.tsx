import { MutableRefObject, useContext, useRef, useState } from 'react';
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from '../@types/artwork';

import { useNavigate } from "react-router-dom";

import { IconContext } from 'react-icons/lib';
import { RiLogoutCircleRLine } from "react-icons/ri";

import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

import { useInterSectionObserver } from '../hooks/useIntersectionObserver';

import Menu from './Menu';
import Logo from './Logo';
import Navigation from './Navigation';

import "../styles/components/Navbar.css"

const Navbar = () => {
    const { userDispatch, handleInfoCard } = useContext(artworkContext) as IArtworkContext;
    const [visible, setVisible] = useState<boolean>(false);
    const elementRef01: MutableRefObject<HTMLElement | any> = useRef();
    const [navbarRef] = useInterSectionObserver(setVisible, elementRef01);
    const navigate = useNavigate();


    const logout = async () => {
        try {
            await signOut(auth);
            handleInfoCard("See you next time!");
            userDispatch({ type: "setLogin", payload: false });
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <header className={`${visible ? "show" : ""}`}>
            <div ref={navbarRef && navbarRef} className={"toolbar"}>
                <div className="toolbar-options">
                    <div className="container">
                        <Menu />
                        <Logo />
                        <p className="logo-name">Art Institute of Chicago</p>
                    </div>
                    {/* <Searchbar /> */}
                    <IconContext.Provider value={{ className: "icon-prov" }}>
                        <button className="btn-logout" onClick={logout}><RiLogoutCircleRLine /></button>
                    </IconContext.Provider>
                </div>
            </div>
            <Navigation />
        </header>
    )
}

export default Navbar
