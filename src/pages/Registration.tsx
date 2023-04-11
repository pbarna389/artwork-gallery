import { useState, useContext, FormEvent } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import LoginTitle from "../components/LoginTitle";
import Form from "../components/Form";
import InputWrapper from "../components/InputWrapper";
import OAuth from "../components/OAuth";

import "../styles/pages/Registration.css"
import Login from "./Login";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userDispatch, fetchUserData } = useContext(artworkContext) as IArtworkContext;
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (auth.currentUser) {
                updateProfile(auth?.currentUser, {
                    displayName: name
                })
            }

            const formData = { id: user.uid, name: name, email: email, timestamp: serverTimestamp(), favArtist: [], favArtworks: [] };

            await setDoc(doc(db, "users", user.uid), formData);

            navigate("/")
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error);
        }

        fetchUserData();
    }

    const handleChange = (e: any, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target?.value)
    }

    return (
        <div className="registration-wrapper">
            <Form>
                <LoginTitle text="Registration" />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <InputWrapper>
                        <input placeholder="Your name..." type="string" onChange={(e) => handleChange(e, setName)} />
                    </InputWrapper>
                    <InputWrapper>
                        <input placeholder="Email..." type="email" onChange={(e) => handleChange(e, setEmail)} />
                    </InputWrapper>
                    <InputWrapper>
                        <input placeholder="Password..." type="password" onChange={(e) => handleChange(e, setPassword)} />
                    </InputWrapper>
                    <button type="submit">Register</button>
                </form>
            </Form>
            <OAuth />
        </div>
    )
}

export default Register