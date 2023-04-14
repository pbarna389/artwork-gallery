import { IChildren } from "../@types/artwork";

import { Swiper } from "swiper/react";
import SwiperCore, { Virtual, Mousewheel, Pagination as SwiperPagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';

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
            modules={virtual ? [Mousewheel, SwiperPagination, Virtual] : [Mousewheel, SwiperPagination]}
            grabCursor={true}
            mousewheel={true}
            pagination={{
                type: "fraction"
            }}
            centeredSlides={true}
            slidesPerView={slideNumber}
            spaceBetween={30}
            className="mySwiper"
        // virtual
        >
            {children}
        </Swiper>
    )
}

export default SwiperWrapper