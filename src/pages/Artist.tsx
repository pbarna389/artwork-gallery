import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { Interweave } from "interweave";

import { SwiperSlide } from "swiper/react";

import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import Pagination from "../components/Pagination";
import FavouriteButton from "../components/FavouriteButton";
import ImagePlaceholder from "../components/ImagePlaceholder";
import SwiperWrapper from "../components/SwiperWrapper";
import NavigateIcon from "../components/NavigateIcon";
import NavigateForward from "../components/NavigateForward";

import "../styles/pages/Artist.css"


interface IArtist {
    type: "profile" | "browse"
};

const Artist: React.FC<IArtist> = ({ type }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { actual_artist, artistArtworks, artistArtworkMaxPage, setArtistArtworkPag, setArtworkID, actualArtistArtworksURLS, loading, mobileView } = useContext(artworkContext) as IArtworkContext;
    const [elementRef] = useInterSectionObserver(setVisible);

    const params = useParams();

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    };

    return (
        <div ref={elementRef && elementRef} className={`artist-wrapper ${visible ? "show" : ""}`}>
            {
                !loading && actual_artist ?
                    <>
                        <div className="artist-info-wrapper">
                            <div className="title-wrapper">
                                <h2>{actual_artist.title}</h2>
                                <FavouriteButton type="Artist" />
                            </div>
                            <p className="birth-paragraph">{actual_artist.birth_date} - {actual_artist.death_date}</p>
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
                            <div className="artist-swiper-with-pagination">
                                <SwiperWrapper direction={mobileView ? "horizontal" : "vertical"} slideNumber={mobileView ? 1 : 3} virtual={true}>
                                    {
                                        actualArtistArtworksURLS ?
                                            actualArtistArtworksURLS.map((el: any, idx: number) =>
                                                <SwiperSlide key={el.id} virtualIndex={idx} >

                                                    {
                                                        el.url !== "https://www.artic.edu/iiif/2/null" ?
                                                            <img src={`${el.url}/full/843,/0/default.jpg`} alt="" loading="lazy" style={{ backgroundImage: `url(${el.lqip})` }} />
                                                            :
                                                            <ImagePlaceholder />
                                                    }
                                                    <div className="link-wrapper">
                                                        <span className="link-title">{el.title}</span>
                                                        <Link
                                                            to={`${type === "browse" ? `/artists/${params.page}/${params.personid}/${params.artworkpage}/${el.id}` : `/profile/artist/${params.personid}/${params.artworkpage}/${el.id}`}`}
                                                            onClick={e => handleClick(e, el.id)}
                                                        >
                                                            <NavigateForward />
                                                        </Link>
                                                    </div>
                                                </SwiperSlide>)
                                            : null
                                    }
                                </SwiperWrapper>
                                <p>Current page: {params.artworkpage}</p>
                                <Pagination pageNumMax={artistArtworkMaxPage} setPagination={setArtistArtworkPag} related={"related_list"} />
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <NavigateIcon parent={`${type === "browse" ? "Artist" : "Profile"}`} setState={setVisible} />
                        </div>
                    </>
                    : <div>Loading...</div>
            }
        </div>
    )
}

export default Artist