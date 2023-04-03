import { useState, useContext, FormEvent } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { auth, googleProvider } from "../config/firebase-config"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

import "../styles/pages/Login.css"

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userDispatch } = useContext(artworkContext) as IArtworkContext;

    console.log(auth?.currentUser);

    const signIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={e => signIn(e)}>
                <input required placeholder="Email..." type="email" onChange={(e) => setEmail(e.target.value)} />
                <input required placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign-in</button>
            </form>
            <Link to="/registration"><button>Registration</button></Link>
            <button onClick={signInWithGoogle}> Sign in With Google</button>
        </div>
    )
}

export default Login