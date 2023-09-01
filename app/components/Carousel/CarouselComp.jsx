"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from './Slide';


const CarouselComp = () => {
  return (
    <>
      <div className="lg:max-w-[1200px] mx-auto">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={5000}
          infiniteLoop
          showThumbs={false}
        >
         <Slide src='/images/banner/1.jpg'/>
         <Slide src='/images/banner/2.jpg'/>
         <Slide src='/images/banner/3.avif'/>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComp;
