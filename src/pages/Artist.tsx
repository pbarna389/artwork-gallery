import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { Interweave } from "interweave";

import Pagination from "../components/Pagination";

import "../styles/pages/Artist.css"

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


const Artist = () => {
    const { actual_artist, artistArtworks, artistArtworkMaxPage, setArtistArtworkPag, setArtworkID } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params);
    if (actual_artist && artistArtworks) console.log(artistArtworks)

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    };

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
                            <div className="artist-artwork-wrapper">
                                <Swiper spaceBetween={50} slidesPerView={3} onSlideChange={() => console.log("slide change")}>
                                    {
                                        artistArtworks ?
                                            artistArtworks.map((el: any) => <SwiperSlide key={el.id}><Link to={`/artists/${params.page}/${params.personid}/${params.artworkpage}/${el.id}`} onClick={e => handleClick(e, el.id)}><img src={`${el.thumbnail?.lqip}`} />{el.title}</Link></SwiperSlide>)
                                            : null
                                    }
                                </Swiper>
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