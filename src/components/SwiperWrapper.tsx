import { useEffect, useState } from "react";

import { IChildren } from "../@types/artwork";

import { Swiper } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination, Lazy } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/css/scrollbar"

import "../styles/components/SwiperWrapper.css"

SwiperCore.use([Virtual, Mousewheel, SwiperPagination]);

interface ISwiperWrapper extends IChildren {
    direction: "horizontal" | "vertical";
    slideNumber: number;
    virtual: boolean
}

const SwiperWrapper: React.FC<ISwiperWrapper> = ({ children, direction, slideNumber, virtual }) => {
    return (
        <Swiper
            direction={direction}
            modules={virtual ? [Virtual, Mousewheel, SwiperPagination] : [Mousewheel, SwiperPagination]}
            grabCursor={true}
            mousewheel={true}
            // scrollbar={{ hide: false }}
            pagination={{
                type: "fraction"
            }}
            centeredSlides={true}
            slidesPerView={slideNumber}
            spaceBetween={30}
            className="mySwiper"
            virtual
        >
            {children}
        </Swiper>
    )
}

export default SwiperWrapper