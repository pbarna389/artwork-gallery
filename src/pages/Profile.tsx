import { useEffect, useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";

import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination } from "swiper";

import Picture from "../assets/prof-pic.png";

import "../styles/pages/Profile.css";

SwiperCore.use([Virtual, Mousewheel, SwiperPagination]);

const Profile = () => {
    const { userState, setArtistPagination, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag, setArtworkID } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(userState.favouriteArtists, userState.favouriteArtworks)

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

    const handleClickArtwork = (e: any, id: number): void => {
        setArtworkID(id)
    }

    return (
        <div className="profile-wrapper">
            <div>
                <h3>Artists: </h3>
                <Swiper
                    direction={"horizontal"}
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
                        userState.favouriteArtists ?
                            userState.favouriteArtists.map((el: any, idx: number) =>
                                <SwiperSlide key={el.title} virtualIndex={idx}>
                                    <Link key={el.id} to={`/profile/artist/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(e, el.id)} style={{ backgroundImage: `url(${Picture})` }}>
                                        <div className="artist-name">
                                            {el.title}
                                        </div>
                                    </Link>
                                </SwiperSlide>)
                            : null
                    }
                </Swiper>
            </div>
            <div>
                <h3>Artworks: </h3>
                <Swiper
                    direction={"horizontal"}
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
                        userState.favouriteArtworks ?
                            userState.favouriteArtworks.map((el: any, idx: number) =>
                                <SwiperSlide key={el.title} virtualIndex={idx}>
                                    <Link key={el.id} to={`/profile/artwork/${el.id}`} onClick={e => handleClickArtwork(e, el.id)} style={{ backgroundImage: `url(${Picture})` }}>
                                        <div className="artist-name">
                                            {el.title}
                                        </div>
                                    </Link>
                                </SwiperSlide>)
                            : null
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Profile