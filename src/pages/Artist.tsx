import { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { Interweave } from "interweave";

import { SwiperSlide } from "swiper/react";

import Pagination from "../components/Pagination";
import FavouriteButton from "../components/FavouriteButton";
import ImagePlaceholder from "../components/ImagePlaceholder";
import SwiperWrapper from "../components/SwiperWrapper";

import "../styles/pages/Artist.css"

interface IArtist {
    type: "profile" | "browse"
};

const Artist: React.FC<IArtist> = ({ type }) => {
    const { actual_artist, artistArtworks, artistArtworkMaxPage, setArtistArtworkPag, setArtworkID, actualArtistArtworksURLS, loading } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params);
    if (actual_artist && artistArtworks) console.log(artistArtworks)

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    };

    return (
        <div className="artist-wrapper">
            {
                !loading && actual_artist ?
                    <>
                        <div className="artist-info-wrapper">
                            <FavouriteButton type="Artist" />
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
                            </div>
                        </div>
                        <div className="artist-artwork-wrapper">
                            <p>Current page: {params.artworkpage}</p>
                            <SwiperWrapper direction="vertical" slideNumber={3}>
                                {
                                    actualArtistArtworksURLS ?
                                        actualArtistArtworksURLS.map((el: any, idx: number) =>
                                            <SwiperSlide key={el.id} virtualIndex={idx} >
                                                {
                                                    el.url !== "https://www.artic.edu/iiif/2/null" ?
                                                        <img src={`${el.url}/full/200,/0/default.jpg`} alt="" loading="lazy" placeholder="loading..." />
                                                        :
                                                        <ImagePlaceholder />
                                                }
                                                <Link
                                                    to={`${type === "browse" ? `/artists/${params.page}/${params.personid}/${params.artworkpage}/${el.id}` : `/profile/artist/${params.personid}/${params.artworkpage}/${el.id}`}`}
                                                    onClick={e => handleClick(e, el.id)}
                                                >
                                                    {el.title}
                                                </Link>
                                            </SwiperSlide>)
                                        : null
                                }
                            </SwiperWrapper>
                            <Pagination pageNumMax={artistArtworkMaxPage} setPagination={setArtistArtworkPag} related={"related_list"} />
                        </div>
                    </>
                    : <div>Loading...</div>
            }

        </div>
    )
}

export default Artist