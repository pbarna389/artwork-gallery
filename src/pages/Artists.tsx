import { useState, useContext, useEffect } from 'react';

import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Virtual } from "swiper";

import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';
import Background from '../components/Background';
import Columns from '../components/Columns';

import "../styles/pages/Artists.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';

SwiperCore.use([Virtual, EffectCoverflow]);

const Artists = () => {
    const { artists, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag } = useContext(artworkContext) as IArtworkContext;

    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number): void => {
        const target = e.target as unknown as HTMLAnchorElement;
        console.log(target.innerHTML);
        setArtistID(id);
        setArtistName(target.innerHTML.split(" ").slice(-1).join(""));
    };

    return (
        <div>
            <Background />
            <Columns />
            <div className="artists-wrapper">
                <div>Current page: {params.page}</div>

                <Swiper
                    direction={"vertical"}
                    modules={[EffectCoverflow, Virtual]}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 50,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    className="mySwiper"
                    virtual
                >
                    {
                        artists ?
                            artists.map((el: any, index: number) =>
                                <SwiperSlide key={el.title} virtualIndex={index}>
                                    <Link key={el.id} to={`/artists/${params.page}/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(e, el.id)}>
                                        <div>
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