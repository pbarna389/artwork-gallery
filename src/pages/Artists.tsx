import { useContext, useEffect } from 'react';

import { Link, useParams } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';
import SwiperWrapper from '../components/SwiperWrapper';

import "../styles/pages/Artists.css";

import Picture from "../assets/prof-pic.png";

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
            {/* <Background /> */}
            {/* <Columns /> */}
            <div className="artists-wrapper">
                <div>Current page: {params.page}</div>

                <SwiperWrapper direction='horizontal' slideNumber={5}>
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
                </SwiperWrapper>
                <Pagination pageNumMax={artistMaxPage} setPagination={setArtistPagination} related={"artist_list"} />
            </div>
        </div>
    )
}

export default Artists