import { IconContext } from "react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";

import "../styles/components/NavigateIcon.css";

interface INavigateIcon {
    parent: "Artist" | "Artist_Artwork" | "Artwork" | "Profile" | "Profile_Artist_Artwork"
}

const NavigateIcon: React.FC<INavigateIcon> = ({ parent }) => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const handleClick = () => {
        navigate(`${parent === "Artist" ? `/artists/${params.page}/` : parent === "Artist_Artwork" ? `/artists/${params.page}/${params.personid}/${params.artworkpage}` : parent === "Artwork" ? `/artworks/${params.artworkspage}` : parent === "Profile_Artist_Artwork" ? `/profile/artist/${params.personid}/${params.artworkpage}` : "/profile"}`)
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