import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import iphone from '../../img/Gemini_Generated_Image_83k7yv83k7yv83k7.jpg'
import samsung from '../../img/Gemini_Generated_Image_cxw0evcxw0evcxw0.jpg'
import oppo from '../../img/Gemini_Generated_Image_y88dfly88dfly88d.jpg'
import huawie from '../../img/Gemini_Generated_Image_yi432oyi432oyi43.jpg'
import realme from '../../img/Gemini_Generated_Image_d9rehrd9rehrd9re.jpg'

export default function HeroSlider() {

  return (
    <div className="w-full bg-white rounded-[16px] mt-[16px] mb-[60px] box-border [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet]:w-[10px] [&_.swiper-pagination-bullet]:h-[10px] [&_.swiper-pagination-bullet]:bg-[#cccccc] [&_.swiper-pagination-bullet]:opacity-60 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:w-[24px] [&_.swiper-pagination-bullet-active]:rounded-[12px] [&_.swiper-pagination-bullet-active]:!bg-[#0088ff] [&_.swiper-pagination-bullet-active]:opacity-100">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={'fade'}
        loop={5}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-full"
      >
        
          <SwiperSlide >
            <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img
                src={iphone}
                className="w-full h-full object-contain object-center rounded-[12px] transition-all duration-300 linear hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img
                src={samsung}
                className="w-full h-full object-contain object-center rounded-[12px] transition-all duration-300 linear hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img
                src={oppo}
                className="w-full h-full object-contain object-center rounded-[12px] transition-all duration-300 linear hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img
                src={huawie}
                className="w-full h-full object-contain object-center rounded-[12px] transition-all duration-300 linear hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img
                src={realme}
                className="w-full h-full object-contain object-center rounded-[12px] transition-all duration-300 linear hover:scale-105"
              />
            </div>
          </SwiperSlide>
      
      </Swiper>
    </div>
  );
}