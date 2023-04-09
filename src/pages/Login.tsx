import { useState, useContext, FormEvent } from "react";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { auth, db } from "../config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";

import "../styles/pages/Login.css"

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userDispatch, fetchUserData } = useContext(artworkContext) as IArtworkContext;

    console.log(auth)
    console.log(auth?.currentUser);

    // const fetchUserData = async () => {
    //     if (auth.currentUser?.uid) {
    //         const userRef = doc(db, "users", auth.currentUser.uid);
    //         const userSnap = await getDoc(userRef);

    //         console.log(userSnap.data());
    //         userDispatch({ type: "setUserData", payload: userSnap.data() });
    //         userDispatch({ type: "setFavouriteArtists", payload: userSnap.data()?.favArtist });
    //         userDispatch({ type: "setFavouriteArtworks", payload: userSnap.data()?.favArtworks });
    //     }
    // }

    const signIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log(user);
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error);
        }

        fetchUserData();
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={e => signIn(e)}>
                <input required placeholder="Email..." type="email" onChange={(e) => setEmail(e.target.value)} />
                <input required placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign-in</button>
            </form>
            <Link to="/registration"><button>Registration</button></Link>
            <OAuth />
        </div>
    )
}

export default Login