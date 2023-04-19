import { useState, useContext, FormEvent } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import { RiMailLockFill, RiLockFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import LoginTitle from "../components/LoginTitle";
import Form from "../components/Form";
import InputWrapper from "../components/InputWrapper";
import OAuth from "../components/OAuth";

import "../styles/pages/Registration.css"

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { fetchUserData, handleTimeout } = useContext(artworkContext) as IArtworkContext;

    const [visible, setVisible] = useState<boolean>(false);
    const [registerTimeout, setRegisterTimeout] = useState<NodeJS.Timeout>();
    const [elementRef] = useInterSectionObserver(setVisible);

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

            handleTimeout(setVisible, navigate, "/", registerTimeout, setRegisterTimeout);

        } catch (error) {
            console.log(error);
        }

        fetchUserData();
    }

    const handleChange = (e: any, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target?.value)
    }

    return (
        <div ref={elementRef && elementRef} className={`registration-wrapper ${visible ? "show" : ""}`}>
            <Form>
                <LoginTitle text="Registration" />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <InputWrapper>
                        <IconContext.Provider value={{ className: "icon-prov" }}>
                            <MdOutlineDriveFileRenameOutline />
                        </IconContext.Provider>
                        <input placeholder="Your name..." type="string" onChange={(e) => handleChange(e, setName)} />
                    </InputWrapper>
                    <InputWrapper>
                        <IconContext.Provider value={{ className: "icon-prov" }}>
                            <RiMailLockFill />
                        </IconContext.Provider>
                        <input placeholder="Email..." type="email" onChange={(e) => handleChange(e, setEmail)} />
                    </InputWrapper>
                    <InputWrapper>
                        <IconContext.Provider value={{ className: "icon-prov" }}>
                            <RiLockFill />
                        </IconContext.Provider>
                        <input placeholder="Password..." type="password" onChange={(e) => handleChange(e, setPassword)} />
                    </InputWrapper>
                    <button className="basic-button" type="submit">Register</button>
                </form>
                <OAuth setState={setVisible} />
            </Form>
        </div>
    )
}

export default Register