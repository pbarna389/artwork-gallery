import { useEffect, useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";

import { Link, useParams } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import SwiperWrapper from "../components/SwiperWrapper";
import Picture from "../assets/prof-pic.png";
import ImagePlaceholder from "../components/ImagePlaceholder";
import NavigateForward from "../components/NavigateForward";

import "../styles/pages/Profile.css";

const Profile = () => {
    const { userState, setArtistPagination, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag, setArtworkID } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(userState.favouriteArtists, userState.favouriteArtworks)

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
        setArtistArtworkPag(1)
    }, []);


    const handleClick = (id: number, name: string, type: "Artist" | "Artwork"): void => {
        if (type === "Artist") {
            setArtistID(id);
            setArtistName(name.split(" ").slice(-1).join(""));
        } else {
            setArtworkID(id)
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="artist-wrapper">
                <h3>Artists: </h3>
                <SwiperWrapper key="swiper-artist" direction="horizontal" slideNumber={5} virtual={true}>
                    {
                        userState.favouriteArtists ?
                            userState.favouriteArtists.map((el: any, idx: number) =>
                                <SwiperSlide key={el.title} virtualIndex={idx}>
                                    <div className="img-wrapper">
                                        <img src={Picture} alt="" loading="lazy" placeholder={`${el.lqip}`} />
                                    </div>
                                    <div className="link-wrapper">
                                        <span>{el.title}</span>
                                        <Link key={el.id} to={`/profile/artist/${el.id}/${artistArtworkPag}`} onClick={() => handleClick(el.id, el.title, "Artist")}>
                                            <NavigateForward />
                                        </Link>
                                    </div>
                                </SwiperSlide>)
                            : null
                    }
                </SwiperWrapper>
            </div>
            <div className="artworks-wrapper">
                <h3>Artworks: </h3>
                <SwiperWrapper key="swiper-artwork" direction="horizontal" slideNumber={5} virtual={true}>
                    {
                        userState.favouriteArtworks ?
                            userState.favouriteArtworks.map((el: any, idx: number) =>
                                <SwiperSlide key={`slide/${el.id}`} virtualIndex={idx}>
                                    <div className="img-wrapper">
                                        {
                                            el.image !== null ?
                                                <img src={el.image} alt="" loading="lazy" placeholder={`${el.lqip}`} />
                                                :
                                                <ImagePlaceholder />
                                        }
                                    </div>
                                    <div className="link-wrapper">
                                        <span>{el.title}</span>
                                        <Link to={`/profile/artwork/${el.id}`} onClick={() => handleClick(el.id, el.title, "Artwork")}>
                                            <NavigateForward />
                                        </Link>
                                    </div>
                                </SwiperSlide>)
                            : null
                    }
                </SwiperWrapper>
            </div>
        </div>
    )
}

export default Profile