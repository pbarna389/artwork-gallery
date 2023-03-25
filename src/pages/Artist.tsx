import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { Interweave } from "interweave";

import Pagination from "../components/Pagination";

const Artist = () => {
    const { actual_artist, artistArtworks, artistArtworkMaxPage, setArtistArtworkPag } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params);
    if (actual_artist && artistArtworks) console.log(artistArtworks)

    return (
        <div className="artist-wrapper">
            {
                actual_artist ?
                    <>
                        <h2>{actual_artist.title}</h2>
                        <p>{actual_artist.birth_date} - {actual_artist.death_date}</p>
                        <div>
                            {
                                actual_artist.description ?
                                    <Interweave
                                        content={`${actual_artist.description}`} />
                                    :
                                    <p>No data is available at the moment</p>
                            }
                            <div>
                                <ul>
                                    {
                                        artistArtworks ?
                                            artistArtworks.map((el: any) => <li key={el.id}><Link to={`/artists/${params.page}/${params.personid}/${params.artworkpage}/${el.id}`}>{el.title}</Link></li>)
                                            : null
                                    }
                                </ul>
                            </div>
                        </div>
                        <Pagination pageNumMax={artistArtworkMaxPage} setPagination={setArtistArtworkPag} related={"related_list"} />
                    </>
                    : null
            }

        </div>
    )
}

export default Artist