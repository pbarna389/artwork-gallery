import { useState, useEffect } from "react";
import prof_picture from "../assets/prof-pic.png";
import goya from "../assets/goya.jpg";
import { Link } from "react-router-dom";
import NavigateForward from "./NavigateForward";

import "../styles/components/RecommendationCard.css";

interface RecommendationCardProps {
    id: number,
    title: string,
    type: "artist" | "artwork",
    artistTO?: number,
    artworkTO?: number,
    handleSetArtist?: Function,
    artistArtworkPag?: number,
    url?: string,
    img_id?: string,
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ id, title, type, handleSetArtist, artistArtworkPag, url, img_id, artistTO, artworkTO }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [visibleFalseTO, setVisibleFalseTO] = useState<NodeJS.Timeout>();
    const [visibleTrueTO, setVisibleTrueTO] = useState<NodeJS.Timeout>();

    useEffect(() => {
        const visibleFalseTimeout: NodeJS.Timeout = setTimeout(() => {
            setVisible(false)
        }, type === "artist" && artistTO ? artistTO - 300 : type === "artwork" && artworkTO ? artworkTO - 300 : 0);
        const visibleTrueTimeout: NodeJS.Timeout = setTimeout(() => {
            setVisible(true)
        }, type === "artist" && artistTO ? artistTO + 10 : type === "artwork" && artworkTO ? artworkTO + 10 : 0);

        setVisibleFalseTO(visibleFalseTimeout);
        setVisibleTrueTO(visibleTrueTimeout);

        return () => {
            clearTimeout(visibleFalseTO);
            clearTimeout(visibleTrueTO);
        }
    }, [visible]);

    return (
        <div className={`rec-wrapper`}>
            <h2>Recommended {type === "artist" ? "Artist" : "Artwork"}:</h2>
            <Link className={`link ${visible ? "show" : ""}`} key={id} to={type === "artist" ? `/artist/${id}/${artistArtworkPag}` : `/artwork/${id}`} onClick={() => handleSetArtist ? handleSetArtist(title, id) : {}}>
                <img src={type === "artwork" ? img_id ? `${url}/${img_id}/full/843,/0/default.jpg` : goya : prof_picture} alt="" />
                <div className="link-wrapper">
                    <span>{title}</span>
                    <NavigateForward />
                </div>
            </Link>
        </div>
    )
}

export default RecommendationCard