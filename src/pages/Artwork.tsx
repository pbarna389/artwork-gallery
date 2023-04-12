import { useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";
import FavouriteButton from "../components/FavouriteButton";
import { useParams } from "react-router-dom";

import ImagePlaceholder from "../components/ImagePlaceholder";

import "../styles/pages/Artwork.css"

const Artwork = () => {
    const { actual_artwork, actual_artwork_url, actual_artwork_id } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    if (actual_artwork) console.log(actual_artwork)
    console.log(params);

    return (
        <div className="artwork-wrapper">
            <div className="placeholder"><p>placeholder</p></div>
            {
                actual_artwork ?
                    <>
                        <div className="artwork-image-wrapper">
                            {
                                actual_artwork_id && actual_artwork_url ?
                                    <>
                                        <img src={`${actual_artwork_url}/${actual_artwork_id}/full/843,/0/default.jpg`} />
                                        <h2>{actual_artwork.title}</h2>
                                    </>
                                    :
                                    <>
                                        <ImagePlaceholder />
                                        <h2>{actual_artwork.title}</h2>
                                    </>
                            }
                        </div>
                        <div className="artwork-details-wrapper">
                            <FavouriteButton type="Artwork" />
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