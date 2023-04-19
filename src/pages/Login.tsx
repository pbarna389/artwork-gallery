import { useState, useContext, FormEvent } from "react";

import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import { RiMailLockFill, RiLockFill } from "react-icons/ri";

import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import InputWrapper from "../components/InputWrapper";
import OAuth from "../components/OAuth";
import Form from "../components/Form";
import LoginTitle from "../components/LoginTitle";

import "../styles/pages/Login.css"

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [elementRef] = useInterSectionObserver(setVisible);
    const [loginTimeout, setLoginTimeout] = useState<NodeJS.Timeout>();

    const { userDispatch, fetchUserData, handleTimeout, handleInfoCard } = useContext(artworkContext) as IArtworkContext;
    const navigate = useNavigate();

    console.log(auth)
    console.log(auth?.currentUser);

    const signIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log(user);

            setVisible(false);
            const id = setTimeout(() => {
                userDispatch({ type: "setLogin", payload: true });
            }, 600);
            setLoginTimeout(id);
            handleInfoCard("Welcome!")
            if (loginTimeout) clearTimeout(loginTimeout);
        } catch (error) {
            handleInfoCard("Invalid username or password!")
            console.log(error);
        }

        fetchUserData();
    };

    const regForward = () => {
        handleTimeout(setVisible, navigate, "/registration", loginTimeout, setLoginTimeout)
    }

    return (
        <div ref={elementRef && elementRef} className={`login-wrapper ${visible ? "show" : ""}`}>
            <Form>
                <LoginTitle text="Login" />
                <IconContext.Provider value={{ className: "icon-prov" }}>
                    <form onSubmit={e => signIn(e)}>
                        <InputWrapper>
                            <RiMailLockFill />
                            <input required placeholder="Email..." type="email" onChange={(e) => setEmail(e.target.value)} />
                        </InputWrapper>
                        <InputWrapper>
                            <RiLockFill />
                            <input required placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
                        </InputWrapper>
                        <button className="basic-button" type="submit">Sign-in</button>
                        <OAuth setState={setVisible} />
                    </form>
                    <div className="auth-wrapper">
                        <button className="basic-button" onClick={() => regForward()}>Registration</button>
                    </div>
                </IconContext.Provider>
            </Form>
        </div>
    )
}

export default Login