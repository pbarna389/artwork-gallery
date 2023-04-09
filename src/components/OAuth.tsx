import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import googlePic from "../assets/googleIcon.svg";

import "../styles/components/Oauth.css";

const OAuth = () => {
    const { userDispatch, fetchUserData } = useContext(artworkContext) as IArtworkContext;
    const location = useLocation();
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {

                const formData = { id: user.uid, name: user.displayName, email: user.email, timestamp: serverTimestamp(), favArtist: [], favArtworks: [] };

                await setDoc(doc(db, 'users', user.uid), formData);
            }

            navigate("/");
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error)
        }

        fetchUserData();
    };

    return (
        <div className="oauth-wrapper" onClick={signInWithGoogle}>
            <img src={googlePic} alt="google icon" />
            <span>Sign {location.pathname === "/" ? "in" : "up"} with Google</span>
        </div>
    )
}

export default OAuth