"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  Keyboard,
  EffectCreative,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Media } from "@/payload-types";
import Image from "next/image";

import Link from "next/link";

interface Data {
  poster: Media;
  title: string;
  id: string;
  slug:string
}
interface Props {
  header: string;
  data: Data[];
}
function SwiperComponent({ header, data }: Props) {

  const autoDelayTime = "Populor posts" === header ? 2500 : 4000;
  return (
    <>
      <h2 className="text-3xl font-bold text-[#4a404a] py-4">{header}</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Keyboard, EffectCreative]}
        className="mySwiper"
        autoplay={{
          delay: autoDelayTime,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: false,
            opacity: 0,
            translate: [0, 0, 0],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
      >
        {data.map((e, i) => (
          <SwiperSlide
            key={i}
            className="pt-0 pb-5 md:pb-6 md:pt-5 bg-red-2000"
          >
            <Link href={`/post/${e.slug}`}>
              <div className="flex flex-col h-full  w-full">
                <div className="w-full h-[250px]  relative">
                  <Image
                  loading="lazy"
                    src={e.poster.url || ""}
                    alt={e.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover object-top as"
                  />
                </div>
                <h3 className="text-md md:text-lg font-bold text-[#4a404a] p-2">
                  {e.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperComponent;
