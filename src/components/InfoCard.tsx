import { useContext, useState, useEffect } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import "../styles/components/InfoCard.css";

const InfoCard = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [loaderTimeoutID, setLoaderTimeoutID] = useState<NodeJS.Timeout>();
    const { infoCardState } = useContext(artworkContext) as IArtworkContext;

    useEffect(() => {
        timerReset();
    }, [infoCardState.clickedAgain === true, infoCardState.infoCardText])

    const resetTimer = (timeoutTime: number, resetTime: number): void => {
        if (loader) {
            setLoader(false)
            const id = setTimeout(() => {
                setLoader(true);
            }, resetTime);
            setLoaderTimeoutID(id);
        } else {
            setLoader(true);
            const id = setTimeout(() => {
                setLoader(false);
            }, timeoutTime);
            setLoaderTimeoutID(id);
        }
    };

    const timerReset = () => {
        if (loaderTimeoutID) {
            clearTimeout(loaderTimeoutID);
        }
        resetTimer(2000, 1);
    };

    return (
        <div className={`infoCard ${infoCardState.infoCard ? "show" : ""}`}>
            {infoCardState.infoCardText}
            {
                loader === true &&
                <div className={"load-bar"}></div>
            }
        </div>
    )
}

export default InfoCard