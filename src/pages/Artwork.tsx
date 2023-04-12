import { useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";
import { useParams } from "react-router-dom";

import FavouriteButton from "../components/FavouriteButton";
import ImagePlaceholder from "../components/ImagePlaceholder";
import NavigateIcon from "../components/NavigateIcon";

import "../styles/pages/Artwork.css";

interface IArtwork {
    parent: "Artist" | "Artwork" | "Profile" | "Profile_Artist"
}

const Artwork: React.FC<IArtwork> = ({ parent }) => {
    const { actual_artwork, actual_artwork_url, actual_artwork_id } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    if (actual_artwork) console.log(actual_artwork)
    console.log(params);

    return (
        <div className="artwork-wrapper">
            <NavigateIcon parent={`${parent === "Artist" ? "Artist_Artwork" : parent === "Artwork" ? "Artwork" : parent === "Profile_Artist" ? "Profile_Artist_Artwork" : "Profile"}`} />
            {
                actual_artwork ?
                    <>
                        <div className="artwork-image-wrapper">
                            {
                                actual_artwork_id && actual_artwork_url ?
                                    <>
                                        <div className="title-wrapper">
                                            <h2>{actual_artwork.title}</h2>
                                            <FavouriteButton type="Artwork" />
                                        </div>
                                        <img src={`${actual_artwork_url}/${actual_artwork_id}/full/843,/0/default.jpg`} />
                                    </>
                                    :
                                    <>
                                        <div className="title-wrapper">
                                            <h2>{actual_artwork.title}</h2>
                                            <FavouriteButton type="Artwork" />
                                        </div>
                                        <ImagePlaceholder />
                                    </>
                            }
                        </div>
                        <div className="artwork-details-wrapper">
                            <h2>Title: {actual_artwork.title} ({actual_artwork.date_start}, {actual_artwork.date_end})</h2>
                            <h3>Artist: {actual_artwork.artist_title}</h3>
                            <h4>Department: {actual_artwork.department_title}</h4>
                            <h5>Artwork type: {actual_artwork.artwork_type_title}</h5>
                        </div>
                    </>
                    : null
            }
        </div>
    )
}

export default Artwork