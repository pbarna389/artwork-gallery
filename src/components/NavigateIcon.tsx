import { useState, useContext } from "react";
import { IconContext } from "react-icons";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";
import { useNavigate, useParams } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";

import "../styles/components/NavigateIcon.css";

interface INavigateIcon {
    parent: "Artist" | "Artist_Artwork" | "Artwork" | "Profile" | "Profile_Artist_Artwork",
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigateIcon: React.FC<INavigateIcon> = ({ parent, setState }) => {
    const [navTimeout, setNavTimeout] = useState<NodeJS.Timeout>();
    const { dataDispatch } = useContext(artworkContext) as IArtworkContext;
    const navigate = useNavigate();
    const params = useParams();
    console.log(parent)

    const handleClick = (): void => {
        setState(false);
        const id = setTimeout(() => {
            navigate(`${parent === "Artist" ? `/artists/${params.page}/` : parent === "Artist_Artwork" ? `/artists/${params.page}/${params.personid}/${params.artworkpage}` : parent === "Artwork" ? `/artworks/${params.artworkspage}` : parent === "Profile_Artist_Artwork" ? `/profile/artist/${params.personid}/${params.artworkpage}` : "/profile"}`);
            if (parent === "Artist") {
                console.log("reseting actual artist")
            }
        }, 1000)
        setNavTimeout(id);
        if (navTimeout) clearTimeout(navTimeout);
    };

    return (
        <IconContext.Provider value={{ className: "icon-prov" }}>
            <button onClick={handleClick}>
                <RiLogoutCircleLine />
            </button>
        </IconContext.Provider>
    )
}

export default NavigateIcon