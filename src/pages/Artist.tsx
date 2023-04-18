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

import "../styles/pages/Artist.css"

const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return {
        width
    }
};

interface IArtist {
    type: "profile" | "browse"
};

interface IWindowWidth {
    width: number
};

const Artist: React.FC<IArtist> = ({ type }) => {
    const { actual_artist, artistArtworks, artistArtworkMaxPage, setArtistArtworkPag, setArtworkID, actualArtistArtworksURLS, loading } = useContext(artworkContext) as IArtworkContext;

    const [windowWidth, setWindowWidth] = useState<IWindowWidth>(getWindowDimensions());
    const [mobileView, setMobileView] = useState<boolean>(false);

    const params = useParams();

    useEffect(() => {
        const handleResize = (): void => {
            setWindowWidth(getWindowDimensions())
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    useEffect(() => {
        if (windowWidth.width > 319 && windowWidth.width < 640) setMobileView(true);
        else setMobileView(false);
    }, [windowWidth]);

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    };

    return (
        <div className="artist-wrapper">
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
                                <SwiperWrapper direction={mobileView ? "horizontal" : "vertical"} slideNumber={mobileView ? 1 : 3} virtual={false}>
                                    {
                                        actualArtistArtworksURLS ?
                                            actualArtistArtworksURLS.map((el: any, idx: number) =>
                                                <SwiperSlide key={el.id} virtualIndex={idx} >
                                                    {
                                                        el.url !== "https://www.artic.edu/iiif/2/null" ?
                                                            <img src={`${el.url}/full/843,/0/default.jpg`} alt="" loading="lazy" placeholder={`${el.lqip}`} />
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
                                <p>Current page: {params.artworkpage}</p>
                                <Pagination pageNumMax={artistArtworkMaxPage} setPagination={setArtistArtworkPag} related={"related_list"} />
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <NavigateIcon parent={`${type === "browse" ? "Artist" : "Profile"}`} />
                        </div>
                    </>
                    : <div>Loading...</div>
            }
        </div>
    )
}

export default Artist