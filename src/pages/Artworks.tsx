import { MutableRefObject, useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";

import { SwiperSlide } from "swiper/react";
import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import Pagination from "../components/Pagination";
import ImagePlaceholder from "../components/ImagePlaceholder";
import SwiperWrapper from "../components/SwiperWrapper";
import NavigateForward from "../components/NavigateForward";

import "../styles/pages/Artworks.css";

const Artworks = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const { artworks, artworksMaxPage, artworksPagination, setArtworksPagination, setArtworkID, artworkId, loading, mobileView, dataDispatch } = useContext(artworkContext) as IArtworkContext;

    const params = useParams();

    const elementRef: MutableRefObject<HTMLElement | undefined> = useRef();
    const [wrapperRef] = useInterSectionObserver(setVisible, elementRef);


    const handleClick = (e: any, id: number): void => {
        if (artworkId !== id) {
            console.log("reseting artwork")
            setArtworkID(id)
            dataDispatch({ type: "set_actual_artwork", payload: undefined });
            dataDispatch({ type: "set_actual_artwork_URL", payload: undefined });
            dataDispatch({ type: "set_actual_artwork_ID", payload: undefined });
        }
    }

    return (
        <>
            {
                loading && artworks ?
                    <div>Loading...</div>
                    :
                    <div ref={wrapperRef && wrapperRef} className={`artworks-wrapper ${visible ? "show" : ""}`}>
                        <SwiperWrapper direction="horizontal" slideNumber={mobileView ? 1 : 3.8} virtual={false}>
                            {
                                artworks ?
                                    artworks.map((el: any, index: number) =>
                                        <SwiperSlide key={el.id} virtualIndex={index}>
                                            <div className="img-wrapper">
                                                {
                                                    el.image_id !== null ?
                                                        <img src={`${el.iiif_url}/${el.image_id}/full/843,/0/default.jpg`} alt="" loading="lazy" style={{ backgroundImage: `${el.lqip}` }} />
                                                        :
                                                        <ImagePlaceholder />
                                                }
                                            </div>
                                            <div className="link-wrapper">
                                                <span>{el.title}</span>
                                                <Link to={`/artworks/${params.artworkspage}/${el.id}`} onClick={e => handleClick(e, el.id)}>
                                                    <NavigateForward />
                                                </Link>
                                            </div>
                                        </SwiperSlide>)
                                    : null
                            }

                        </SwiperWrapper>
                        <div>Current page: {artworksPagination}</div>
                        <Pagination related={"artwork_list"} pageNumMax={artworksMaxPage} setPagination={setArtworksPagination} />
                    </div>
            }
        </>
    )
}

export default Artworks