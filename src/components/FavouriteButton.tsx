import { useState, useEffect, useContext } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";

import { IconContext } from "react-icons/lib";
import { RiHeartAddFill, RiHeart3Fill } from "react-icons/ri";

interface IFavouriteButton {
    type: "Artist" | "Artwork"
}

const FavouriteButton: React.FC<IFavouriteButton> = ({ type }): JSX.Element => {
    const [userData, setUserData] = useState<any>();
    const [favouriteArtists, setFavouriteArtists] = useState<any>();
    const [favouriteArtworks, setFavouriteArtworks] = useState<any>();

    const { actual_artist, actual_artwork_url, actual_artwork_id, actual_artwork, userState, userDispatch } = useContext(artworkContext) as IArtworkContext;

    console.log(actual_artist, actual_artwork, userState)

    console.log(auth.currentUser?.uid)

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser?.uid) {
                const userRef = doc(db, "users", auth.currentUser.uid);
                const userSnap = await getDoc(userRef);

                console.log(userSnap.data());
                setUserData(userSnap.data());
                setFavouriteArtists(userSnap.data()?.favArtist);
                setFavouriteArtworks(userSnap.data()?.favArtworks)
            }
        }
        fetchUserData();
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            if (userData) {
                const userCopy = { ...userData };
                userDispatch({ type: "setUpdate", payload: true });
                if (type === "Artist") {
                    delete userCopy.favArtist;
                    userCopy.favArtist = favouriteArtists;
                    if (auth.currentUser?.uid) {
                        const userRef = doc(db, "users", auth.currentUser.uid);
                        await updateDoc(userRef, userCopy);

                        console.log(favouriteArtists, favouriteArtworks, "new artwork or artist added to favourites")
                    }
                } else {
                    delete userCopy.favArtworks;
                    userCopy.favArtworks = favouriteArtworks
                    if (auth.currentUser?.uid) {
                        const userRef = doc(db, "users", auth.currentUser.uid);
                        await updateDoc(userRef, userCopy);

                        console.log(favouriteArtists, favouriteArtworks, "new artwork or artist added to favourites")
                    }
                }
                console.log(userCopy)
            }

        }
        fetchUserData();
        console.log(favouriteArtists, favouriteArtworks)
    }, [favouriteArtists, favouriteArtworks])

    const handleClick = () => {
        console.log(type);
        if (type === "Artist") {
            const prevFavs = [...favouriteArtists];
            const newFavs = prevFavs.filter((el: any) => el.id === actual_artist.id);
            if (newFavs.length === 0) {
                setFavouriteArtists((prev: any) => [...prev, { title: actual_artist.title, api_link: actual_artist.api_link, id: actual_artist.id }])
            } else {
                setFavouriteArtists((prev: any) => [...prev].filter((el: any) => el.id !== actual_artist.id))
            }
        } else {
            const prevFavs = [...favouriteArtworks];
            const newFavs = prevFavs.filter((el: any) => el.id === actual_artwork.id);
            console.log(actual_artwork)
            if (newFavs.length === 0) {
                setFavouriteArtworks((prev: any) => [...prev, { title: actual_artwork.title, api_link: actual_artwork.api_link, id: actual_artwork.id, image: actual_artwork_id !== null ? `${actual_artwork_url}/${actual_artwork_id}/full/843,/0/default.jpg` : null }])
            } else {
                setFavouriteArtworks((prev: any) => [...prev].filter((el: any) => el.id !== actual_artwork.id))
            }
        };
    }

    return (
        <>
            <IconContext.Provider value={{ className: "icon-prov", color: "red" }}>
                {
                    type === "Artist" && favouriteArtists ?
                        favouriteArtists.filter((el: any) => el.id === actual_artist.id).length === 0 ? <RiHeartAddFill onClick={handleClick} /> : <RiHeart3Fill onClick={handleClick} />

                        : type === "Artwork" && favouriteArtworks ?
                            favouriteArtworks.filter((el: any) => el.id === actual_artwork.id).length === 0 ? <RiHeartAddFill onClick={handleClick} /> : <RiHeart3Fill onClick={handleClick} />
                            : null

                }
            </IconContext.Provider>
        </>
    )
}

export default FavouriteButton