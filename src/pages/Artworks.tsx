import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";

import { SwiperSlide } from "swiper/react";

import Pagination from "../components/Pagination";
import ImagePlaceholder from "../components/ImagePlaceholder";
import SwiperWrapper from "../components/SwiperWrapper";

import "../styles/pages/Artworks.css";

const Artworks = () => {
    const { artworks, artworksMaxPage, artworksPagination, setArtworksPagination, setArtworkID, loading } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params)

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    }

    return (
        <div className="artworks-wrapper">
            {
                loading && artworks ?
                    <div>Loading...</div>
                    :
                    <>
                        <SwiperWrapper direction="horizontal" slideNumber={5}>
                            {
                                artworks.map((el: any, index: number) =>
                                    <SwiperSlide key={el.id} virtualIndex={index}>
                                        {
                                            el.image_id !== null ?
                                                <img src={`${el.iiif_url}/${el.image_id}/full/200,/0/default.jpg`} alt="" loading="lazy" placeholder={`${el.lqip}`} />
                                                :
                                                <ImagePlaceholder />
                                        }
                                        <Link to={`/artworks/${params.artworkspage}/${el.id}`} onClick={e => handleClick(e, el.id)}>
                                            {el.title}
                                        </Link>
                                    </SwiperSlide>)
                            }

                        </SwiperWrapper>
                        <div>Current page: {artworksPagination}</div>
                        <Pagination related={"artwork_list"} pageNumMax={artworksMaxPage} setPagination={setArtworksPagination} />
                    </>
            }
        </div>
    )
}

export default Artworks