"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselEl = () => {
    return (
        <Carousel
            className="xl:h-10/12 "
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showStatus={false}
            showThumbs={false}
        >
            <Image
                src="/1.jpg"
                alt=""
                width={500}
                height={500}
                style={{ objectFit: "cover" }}
                className="w-full h-fullrounded-lg shadow-inner"
            />
            <Image
                src="/2.jpg"
                alt=""
                width={500}
                height={500}
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded-lg shadow-inner"
            />
            <Image
                src="/3.jpg"
                alt=""
                width={500}
                height={500}
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded-lg shadow-inner"
            />
        </Carousel>
    );
};

export default CarouselEl;
