import goya from "../assets/goya.jpg"

import "../styles/components/ImagePlaceholder.css";

const ImagePlaceholder = () => {
    return (
        <div className="image-placeholder" style={{ backgroundImage: `url(${goya})` }}>
            <div className="blur-filter"></div>
            <div className="greyscale-filter"></div>
        </div>
    )
}

export default ImagePlaceholder