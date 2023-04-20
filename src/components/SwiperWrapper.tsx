import { MutableRefObject, useState } from "react";

import { IChildren } from "../@types/artwork";

import { Swiper } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Scrollbar } from "swiper";
import { useInterSectionObserver } from "../hooks/useIntersectionObserver";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/css/scrollbar";

import "../styles/components/SwiperWrapper.css";

SwiperCore.use([Virtual, Mousewheel, Scrollbar]);

interface ISwiperWrapper extends IChildren {
    direction: "horizontal" | "vertical";
    slideNumber: number;
    virtual: boolean;
    intersectionRef: MutableRefObject<HTMLElement | undefined>
}

const SwiperWrapper: React.FC<ISwiperWrapper> = ({ children, direction, slideNumber, virtual, intersectionRef }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const [swiperRef] = useInterSectionObserver(setVisible, intersectionRef);

    return (
        <>
            {
                virtual ?
                    <Swiper
                        ref={swiperRef && swiperRef}
                        direction={direction}
                        modules={[Virtual, Mousewheel, Scrollbar]}
                        grabCursor={true}
                        mousewheel={true}
                        scrollbar={{ draggable: true }}
                        centeredSlides={true}
                        slidesPerView={slideNumber}
                        spaceBetween={30}
                        className={`mySwiper ${visible ? "shown" : ""}`}
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
                        ref={swiperRef && swiperRef}
                        direction={direction}
                        modules={[Mousewheel, Scrollbar]}
                        grabCursor={true}
                        mousewheel={true}
                        scrollbar={{ draggable: true }}
                        centeredSlides={true}
                        slidesPerView={slideNumber}
                        spaceBetween={30}
                        className={`mySwiper ${visible ? "shown" : ""}`}
                    >
                        {children}
                    </Swiper>
            }
        </>

    )
}

export default SwiperWrapper