import { useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";

const Artwork = () => {
    const { actual_artwork, actual_artwork_url, actual_artwork_id } = useContext(artworkContext) as IArtworkContext;

    if (actual_artwork) console.log(actual_artwork)

    return (
        <div>
            <p>Artwork</p>
            {
                actual_artwork ?
                    <>
                        <h2>Title: {actual_artwork.title} ({actual_artwork.date_start}, {actual_artwork.date_end})</h2>
                        <h3>Artist: {actual_artwork.artist_title}</h3>
                        <h4>Department: {actual_artwork.department_title}</h4>
                        <h5>Artwork type: {actual_artwork.artwork_type_title}</h5>
                        {
                            actual_artwork_id && actual_artwork_url ?
                                <img src={`${actual_artwork_url}/${actual_artwork_id}/full/600,/0/default.jpg`} />
                                : <p>Loading...</p>
                        }
                    </>
                    : null
            }
        </div>
    )
}

export default Artwork