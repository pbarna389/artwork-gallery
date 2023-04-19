import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import googlePic from "../assets/googleIcon.svg";

import "../styles/components/Oauth.css";

interface IOauth {
    setState: React.Dispatch<React.SetStateAction<boolean>>
};

const OAuth: React.FC<IOauth> = ({ setState }) => {
    const { userDispatch, fetchUserData, handleInfoCard } = useContext(artworkContext) as IArtworkContext;
    const [authTimeout, setAuthTimeout] = useState<NodeJS.Timeout>();
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

            setState(false);
            const id = setTimeout(() => {
                navigate("/");
                handleInfoCard(`Welcome ${user.displayName}!`);
                userDispatch({ type: "setLogin", payload: true });
            }, 600);

            setAuthTimeout(id);
            if (authTimeout) clearTimeout(authTimeout);

        } catch (error) {
            console.log(error)
        }

        fetchUserData();
    };

    return (
        <button className="oauth-wrapper basic-button" onClick={signInWithGoogle}>
            <span>Sign-{location.pathname === "/" ? "in" : "up"} with </span>
            <img src={googlePic} alt="google icon" />
        </button>
    )
}

export default OAuth