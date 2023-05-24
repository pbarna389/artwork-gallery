import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';

import { Link, useParams } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";

import { useInterSectionObserver } from '../hooks/useIntersectionObserver';
import Pagination from '../components/Pagination';
import SwiperWrapper from '../components/SwiperWrapper';
import NavigateForward from '../components/NavigateForward';
import Loader from '../components/Loader';

import "../styles/pages/Artists.css";

import Picture from "../assets/prof-pic.png";

const Artists = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { artists, artistId, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag, mobileView, loading, dataDispatch, handleSetArtist } = useContext(artworkContext) as IArtworkContext;

    const elementRef01: MutableRefObject<HTMLElement | any> = useRef();
    const swiperRef: MutableRefObject<HTMLElement | any> = useRef();

    const [wrapperRef] = useInterSectionObserver(setVisible, elementRef01);

    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
        setArtistArtworkPag(1)
    }, []);

    return (
        <>
            {
                loading ?
                    <Loader />
                    : !loading && artists ?
                        <div ref={wrapperRef && wrapperRef} className={`artists-wrapper ${visible ? "show" : ""}`}>
                            <div>Current page: {params.page}</div>
                            <Pagination pageNumMax={artistMaxPage} setPagination={setArtistPagination} related={"artist_list"} />

                            <SwiperWrapper intersectionRef={swiperRef} direction='horizontal' slideNumber={mobileView ? 1 : 6} virtual={true}>
                                {
                                    artists ?
                                        artists.map((el: any, index: number) =>
                                            <SwiperSlide key={`slide/${el.id}`} virtualIndex={index}>
                                                <div className="img-wrapper">
                                                    <img src={Picture} alt="" loading="lazy" placeholder={`${el.lqip}`} />
                                                </div>
                                                <div className="link-wrapper">
                                                    <span>{el.title}</span>
                                                    <Link key={el.id} to={`/artists/${params.page}/${el.id}/${artistArtworkPag}`} onClick={() => handleSetArtist(el.title, el.id)}>
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
        </>
    )
}

export default Artists