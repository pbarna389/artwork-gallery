import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { Interweave } from "interweave";

import Pagination from "../components/Pagination";

import "../styles/pages/Artist.css"

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Virtual, Mousewheel, SwiperPagination]);

const Artist = () => {
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
                            <Swiper
                                direction={"vertical"}
                                modules={[Virtual, Mousewheel, SwiperPagination]}
                                grabCursor={true}
                                mousewheel={true}
                                pagination={{
                                    type: "fraction"
                                }}
                                centeredSlides={true}
                                slidesPerView={3}
                                spaceBetween={30}
                                className="mySwiper"
                                virtual
                            >
                                {
                                    actualArtistArtworksURLS ?
                                        actualArtistArtworksURLS.map((el: any, idx: number) =>
                                            <SwiperSlide key={el.id} virtualIndex={idx} >
                                                <img src={`${el.url}/full/200,/0/default.jpg`} alt="" />
                                                <Link
                                                    to={`/artists/${params.page}/${params.personid}/${params.artworkpage}/${el.id}`}
                                                    onClick={e => handleClick(e, el.id)}
                                                >
                                                    {el.title}
                                                </Link>
                                            </SwiperSlide>)
                                        : null
                                }
                            </Swiper>
                            <Pagination pageNumMax={artistArtworkMaxPage} setPagination={setArtistArtworkPag} related={"related_list"} />
                        </div>
                    </>
                    : <div>Loading...</div>
            }

        </div>
    )
}

export default Artist