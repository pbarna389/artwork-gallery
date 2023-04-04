import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { db } from "../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = () => {
    const [favArtists, setFavArtists] = useState<any>();
    const [favArtworks, setFavArtworks] = useState<any>();

    useEffect(() => {
        console.log(auth.currentUser);

        const fetchUserData = async () => {
            const usersRef = collection(db, 'users');
            console.log(usersRef);

            const data = query(usersRef, where('id', '==', auth.currentUser?.uid));

            const dataSnap = await getDocs(data);

            dataSnap.forEach(doc => {
                const data = doc.data();
                setFavArtists(data.favArtist);
                setFavArtworks(data.favArtworks);
            });
        }
        fetchUserData();
    }, [auth.currentUser?.uid]);

    useEffect(() => {
        if (favArtists && favArtworks) console.log(favArtists, favArtworks)
    }, [favArtists, favArtworks])

    return (
        <div>Profile</div>
    )
}

export default Profile