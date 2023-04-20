import { useContext, useEffect } from 'react';

import { Link, useParams } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';
import SwiperWrapper from '../components/SwiperWrapper';
import NavigateForward from '../components/NavigateForward';

import "../styles/pages/Artists.css";

import Picture from "../assets/prof-pic.png";

const Artists = () => {
    const { artists, artistId, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag, mobileView, loading, dataDispatch } = useContext(artworkContext) as IArtworkContext;

    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
        setArtistArtworkPag(1)
    }, []);

    const handleClick = (name: string, id: number): void => {
        if (artistId !== id) {
            dataDispatch({ type: "set_actual_artist", payload: undefined });
            dataDispatch({ type: "actual_artist_artworks_URLS", payload: undefined })
            dataDispatch({
                type: "actual_artist_related_artworks", payload: undefined
            });
            dataDispatch({
                type: "actual_artist_artwork_max_page_num", payload: undefined
            })
            setArtistID(id);
            setArtistName(name.split(" ").slice(-1).join("+"));
        }
    };

    return (
        <div>
            {
                loading ?
                    <div>Loading...</div>
                    : !loading && artists ?
                        <div className="artists-wrapper">
                            <div>Current page: {params.page}</div>
                            <Pagination pageNumMax={artistMaxPage} setPagination={setArtistPagination} related={"artist_list"} />

                            <SwiperWrapper direction='horizontal' slideNumber={mobileView ? 1 : 6} virtual={true}>
                                {
                                    artists ?
                                        artists.map((el: any, index: number) =>
                                            <SwiperSlide key={`slide/${el.id}`} virtualIndex={index}>
                                                <div className="img-wrapper">
                                                    <img src={Picture} alt="" loading="lazy" placeholder={`${el.lqip}`} />
                                                </div>
                                                <div className="link-wrapper">
                                                    <span>{el.title}</span>
                                                    <Link key={el.id} to={`/artists/${params.page}/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(el.title, el.id)}>
                                                        <NavigateForward />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>)
                                        : null
                                }
                            </SwiperWrapper>
                        </div>
                        : null
            }
        </div>
    )
}

export default Artists