import { useEffect, useState } from "react";
import picture01 from "../assets/The_Taking_of_Christ-Caravaggio.jpg";
import picture02 from "../assets/Judith-and-Holofernes.jpg";

import "../styles/components/Background.css"

const Background = () => {
    const [showBg, setShowBg] = useState<boolean>(true);
    const [showBgTimeout, setShowBgTimeout] = useState<NodeJS.Timeout>();
    const [backgrounds, setBackgrounds] = useState([picture01, picture02]);
    const [backgroundsRotateTimeout, setBackgroundsRotateTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {
        setShowBg(true);
        const showBgId = setTimeout(() => {
            setShowBg(false);
        }, 18500);

        const rotateBgId = setTimeout(() => {
            rotateArray(backgrounds)
        }, 18700);

        setBackgroundsRotateTimeout(rotateBgId);
        setShowBgTimeout(showBgId);

        return () => {
            clearTimeout(showBgTimeout);
            clearTimeout(backgroundsRotateTimeout);
        }
    }, [backgrounds]);

    const rotateArray = (arr: any[]) => {
        const originalArr: any[] = [];
        arr.forEach((el: any) => originalArr.push(el))
        const firstElement = originalArr.shift();
        const newArr: any = [...originalArr]
        newArr.push(firstElement);
        console.log(firstElement, originalArr, newArr)
        setBackgrounds(newArr)
    }

    return (
        <div className={`background ${showBg ? "show" : "hidden"}`}>
            <div className={`picture`} style={{ backgroundImage: `url(${backgrounds[0]})` }}></div>
        </div>
    )
}

export default Background