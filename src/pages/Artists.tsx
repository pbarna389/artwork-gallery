import { useState, useContext, useEffect } from 'react';

import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination } from "swiper";

import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';
import Background from '../components/Background';
import Columns from '../components/Columns';

import "../styles/pages/Artists.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';

import Picture from "../assets/prof-pic.png";

SwiperCore.use([Virtual, Mousewheel, SwiperPagination]);

const Artists = () => {
    const { artists, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag } = useContext(artworkContext) as IArtworkContext;

    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
        setArtistArtworkPag(1)
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number): void => {
        const target = e.target as unknown as HTMLAnchorElement;
        console.log(target.innerText);
        setArtistID(id);
        setArtistName(target.innerText.split(" ").slice(-1).join(""));
    };

    return (
        <div>
            <Background />
            <Columns />
            <div className="artists-wrapper">
                <div>Current page: {params.page}</div>

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
                        artists ?
                            artists.map((el: any, index: number) =>
                                <SwiperSlide key={el.title} virtualIndex={index}>
                                    <Link key={el.id} to={`/artists/${params.page}/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(e, el.id)} style={{ backgroundImage: `url(${Picture})` }}>
                                        <div className="artist-name">
                                            {el.title}
                                        </div>
                                    </Link>
                                </SwiperSlide>)
                            : null
                    }
                </Swiper>
                <Pagination pageNumMax={artistMaxPage} setPagination={setArtistPagination} related={"artist_list"} />
            </div>
        </div>
    )
}

export default Artists