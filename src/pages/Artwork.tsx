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
    const { actual_artwork, actual_artwork_url, actual_artwork_id, loading } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    if (actual_artwork) console.log(actual_artwork)
    console.log(params);

    return (
        <div className="artwork-wrapper">
            <div className="button-wrapper">
                <NavigateIcon parent={`${parent === "Artist" ? "Artist_Artwork" : parent === "Artwork" ? "Artwork" : parent === "Profile_Artist" ? "Profile_Artist_Artwork" : "Profile"}`} />
            </div>
            {
                actual_artwork && !loading ?
                    <>
                        <div className="artwork-image-wrapper">
                            {
                                actual_artwork_id && actual_artwork_url ?
                                    <>
                                        <div className="img-wrap">
                                            <img src={`${actual_artwork_url}/${actual_artwork_id}/full/843,/0/default.jpg`} loading="lazy" placeholder="loading" />
                                            <FavouriteButton type="Artwork" />
                                        </div>
                                        <div className="title-wrapper">
                                            <h2>{actual_artwork.title}</h2>
                                            <p>{actual_artwork.medium_display}</p>
                                        </div>
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
                            <h6 className="detail-header">{actual_artwork.title}</h6>
                            <p className="detail-paragraph">{actual_artwork.artist_title}</p>
                            <h6 className="detail-header">Geography: </h6>
                            <p className="detail-paragraph">{actual_artwork.place_of_origin}</p>
                            <h6 className="detail-header">Date: </h6>
                            <p className="detail-paragraph">
                                {
                                    actual_artwork.date_start === actual_artwork.date_end ?
                                        actual_artwork.date_start
                                        :
                                        `${actual_artwork.date_start} - ${actual_artwork.date_end}`
                                }
                            </p>
                            <h6 className="detail-header">Medium: </h6>
                            <p className="detail-paragraph">{actual_artwork.artwork_type_title}</p>
                            <h6 className="detail-header">Department: </h6>
                            <p className="detail-paragraph">{actual_artwork.department_title}</p>
                            <h6 className="detail-header">Dimensions: </h6>
                            <p className="detail-paragraph">{actual_artwork.dimensions}</p>
                            <h6 className="detail-header">Credit Line: </h6>
                            <p className="detail-paragraph">{actual_artwork.credit_line}</p>
                            <h6 className="detail-header">Catalogue: </h6>
                            <p className="detail-paragraph">
                                {
                                    actual_artwork.catalogue_display ?
                                        <p>
                                            {
                                                actual_artwork.catalogue_display.split("<p>").join("").split("</p>").join(" / ")
                                            }
                                        </p>
                                        :
                                        <p>
                                            Not catalogized yet
                                        </p>
                                }
                            </p>
                        </div>
                    </>
                    : <div>Loading...</div>
            }
        </div >
    )
}

export default Artwork