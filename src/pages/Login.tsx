import { useState, useContext, FormEvent } from "react";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";

import "../styles/pages/Login.css"

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userDispatch, fetchUserData } = useContext(artworkContext) as IArtworkContext;

    console.log(auth)
    console.log(auth?.currentUser);

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