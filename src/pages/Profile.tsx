import { useEffect, useState, useContext } from "react";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";
import { auth } from "../config/firebase-config";
import { db } from "../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination } from "swiper";

import Picture from "../assets/prof-pic.png";

import "../styles/pages/Profile.css";

SwiperCore.use([Virtual, Mousewheel, SwiperPagination]);

const Profile = () => {
    // const [favArtists, setFavArtists] = useState<any>();
    // const [favArtworks, setFavArtworks] = useState<any>();
    const { userState, artists, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag, setArtistArtworkPag } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(userState.favouriteArtists, userState.favouriteArtworks)

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
        setArtistArtworkPag(1)
    }, []);

    // useEffect(() => {
    //     console.log(auth.currentUser);

    //     const fetchUserData = async () => {
    //         const usersRef = collection(db, 'users');
    //         console.log(usersRef);

    //         const data = query(usersRef, where('id', '==', auth.currentUser?.uid));

    //         const dataSnap = await getDocs(data);

    //         dataSnap.forEach(doc => {
    //             const data = doc.data();
    //             setFavArtists(data.favArtist);
    //             setFavArtworks(data.favArtworks);
    //         });
    //     }
    //     fetchUserData();
    // }, [auth.currentUser?.uid]);

    // useEffect(() => {
    //     if (favArtists && favArtworks) console.log(favArtists, favArtworks)
    // }, [favArtists, favArtworks])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number): void => {
        const target = e.target as unknown as HTMLAnchorElement;
        console.log(target.innerText);
        setArtistID(id);
        setArtistName(target.innerText.split(" ").slice(-1).join(""));
    };

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
                                    <Link key={el.id} to={`/profile/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(e, el.id)} style={{ backgroundImage: `url(${Picture})` }}>
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
                                    <div className="artist-name">
                                        {el.title}
                                    </div>
                                </SwiperSlide>)
                            : null
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Profile