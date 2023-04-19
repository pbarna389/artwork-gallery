import { useEffect, useState } from "react";

import { IChildren } from "../@types/artwork";

import { Swiper } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/css/scrollbar";

import "../styles/components/SwiperWrapper.css";

SwiperCore.use([Virtual, Mousewheel, Scrollbar]);

interface ISwiperWrapper extends IChildren {
    direction: "horizontal" | "vertical";
    slideNumber: number;
    virtual: boolean
}

const SwiperWrapper: React.FC<ISwiperWrapper> = ({ children, direction, slideNumber, virtual }) => {
    return (
        <>
            {
                virtual ?
                    <Swiper
                        direction={direction}
                        modules={[Virtual, Mousewheel, Scrollbar]}
                        grabCursor={true}
                        mousewheel={true}
                        scrollbar={{ draggable: true }}
                        centeredSlides={true}
                        slidesPerView={slideNumber}
                        spaceBetween={30}
                        className="mySwiper"
                        virtual={
                            {
                                slides: [Array.from({ length: slideNumber }, (_, i) => `Slide ${i + 1}`)],
                                addSlidesBefore: 5,
                                addSlidesAfter: 5,
                            }
                        }
                    >
                        {children}
                    </Swiper >
                    :
                    <Swiper
                        direction={direction}
                        modules={[Mousewheel, Scrollbar]}
                        grabCursor={true}
                        mousewheel={true}
                        scrollbar={{ draggable: true }}
                        centeredSlides={true}
                        slidesPerView={slideNumber}
                        spaceBetween={30}
                        className="mySwiper"
                    >
                        {children}
                    </Swiper>
            }
        </>

    )
}

export default SwiperWrapper