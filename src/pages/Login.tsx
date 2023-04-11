import { useState, useContext, FormEvent } from "react";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import { RiMailLockFill, RiLockFill } from "react-icons/ri";

import InputWrapper from "../components/InputWrapper";
import OAuth from "../components/OAuth";
import Form from "../components/Form";
import LoginTitle from "../components/LoginTitle";

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
            {/* <Background /> */}
            <Form>
                <LoginTitle text="Login" />
                <form onSubmit={e => signIn(e)}>
                    <InputWrapper>
                        <IconContext.Provider value={{ className: "icon-prov" }}>
                            <RiMailLockFill />
                        </IconContext.Provider>
                        <input required placeholder="Email..." type="email" onChange={(e) => setEmail(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <IconContext.Provider value={{ className: "icon-prov" }}>
                            <RiLockFill />
                        </IconContext.Provider>
                        <input required placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
                    </InputWrapper>
                    <button className="basic-button" type="submit">Sign-in</button>
                </form>
                <div className="auth-wrapper">
                    <Link to="/registration">
                        <button className="basic-button">Registration</button>
                    </Link>
                    <OAuth />
                </div>
            </Form>
        </div>
    )
}

export default Login