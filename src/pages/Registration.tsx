import { useState, useContext, FormEvent } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userDispatch } = useContext(artworkContext) as IArtworkContext;
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/")
            userDispatch({ type: "setLogin", payload: true });
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target?.value)
    }

    return (
        <div className="registration-wrapper">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder="Email..." type="email" onChange={(e) => handleChange(e, setEmail)} />
                <input placeholder="Password..." type="password" onChange={(e) => handleChange(e, setPassword)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register