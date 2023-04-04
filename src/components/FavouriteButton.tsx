import { useState, useEffect, useContext } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";

interface IFavouriteButton {
    type: "Artist" | "Artwork"
}

const FavouriteButton: React.FC<IFavouriteButton> = ({ type }): JSX.Element => {
    const [userData, setUserData] = useState<any>();
    const [favouriteArtists, setFavouriteArtists] = useState<any>();
    const [favouriteArtworks, setFavouriteArtworks] = useState<any>();

    const { actual_artist, actual_artwork } = useContext(artworkContext) as IArtworkContext;

    console.log(actual_artist, actual_artwork, location.pathname)

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
                setFavouriteArtworks((prev: any) => [...prev, { title: actual_artwork.title, api_link: actual_artwork.api_link, id: actual_artwork.id }])
            } else {
                setFavouriteArtworks((prev: any) => [...prev].filter((el: any) => el.id !== actual_artwork.id))
            }
        };
    }

    return (
        <>
            {
                type === "Artist" && favouriteArtists ?
                    <button onClick={handleClick}>{favouriteArtists.filter((el: any) => el.id === actual_artist.id).length === 0 ? "Add to favourites" : "Remove from favourites"}</button>
                    : type === "Artwork" && favouriteArtworks ?
                        <button onClick={handleClick}>{favouriteArtworks.filter((el: any) => el.id === actual_artwork.id).length === 0 ? "Add to favourites" : "Remove from favourites"}</button>
                        : null

            }
        </>
    )
}

export default FavouriteButton