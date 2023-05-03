import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/NotFound.css";

const NotFound = () => {
    const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout>();
    const navigate = useNavigate();

    useEffect(() => {
        const id = setTimeout(() => {
            navigate("/")
        }, 1500);
        setRedirectTimeout(id);

        return () => clearTimeout(redirectTimeout);
    }, [])

    return (
        <div className="not-found">
            <h2>Sorry, we can't find your requested data</h2>
            <h3>Redirecting to the home page<span>.</span><span>.</span><span>.</span></h3>
        </div>
    )
}

export default NotFound