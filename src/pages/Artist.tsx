import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { Interweave } from "interweave";

import { SwiperSlide } from "swiper/react";

import Pagination from "../components/Pagination";
import FavouriteButton from "../components/FavouriteButton";
import ImagePlaceholder from "../components/ImagePlaceholder";
import SwiperWrapper from "../components/SwiperWrapper";
import NavigateIcon from "../components/NavigateIcon";
import NavigateForward from "../components/NavigateForward";
import Loader from "../components/Loader";

import "../styles/pages/Artist.css"


interface IArtist {
    type: "profile" | "browse"
};

const Artist: React.FC<IArtist> = ({ type }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleTimeout, setVisibleTimeout] = useState<NodeJS.Timeout>();
    const { actual_artist, artistArtworkMaxPage, setArtistArtworkPag, setArtworkID, actualArtistArtworksURLS, loading, mobileView, dataDispatch } = useContext(artworkContext) as IArtworkContext;

    const params = useParams();

    useEffect(() => {
        setVisible(false)
    }, []);

    useEffect(() => {
        if (!loading && actual_artist) {
            const id = setTimeout(() => {
                setVisible(true);
                dataDispatch({ type: "loading", payload: false })
            }, 200)
            setVisibleTimeout(id)
        }

        clearTimeout(visibleTimeout)
    }, [!loading && actual_artist && actualArtistArtworksURLS]);

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    };

    return (
        <>
            {
                !loading && actual_artist && actualArtistArtworksURLS ?
                    <div className={`artist-wrapper ${visible ? "show" : "not-show"}`}>
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
                    </div>
                    : <Loader />
            }
        </>
    )
}

export default Artist