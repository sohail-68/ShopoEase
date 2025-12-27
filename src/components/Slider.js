import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import img from "../images/ngo.jpg";
import wave1 from "../images/wave-up-left-white.svg";
import wave2 from "../images/wave-up-right-white.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const issues = [
  {
    title: "Stories of Impact: Identity for Health in Zambia",
    description:
      "DPI is the backbone of digital transformation in sectors like healthcare, education, and finance. With SmartCare Pro, Zambia is using DPI to bridge the gap between people like Isaac and essential services. Through digital identification, residents now access healthcare services without the need for physical IDs or cumbersome paper records. ..",
    image: img,
  },
  // ... other slide data
];

function Slider() {
  return (
    <div className="w-full relative">
      <Swiper spaceBetween={0} loop={true} className="h-[110vh]">
        {issues.map((issue, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[70vh] md:h-[90vh] lg:h-[110vh] overflow-hidden">
              {/* Image container */}
              <div className="absolute inset-0 -z-0 overflow-hidden">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Text Content Overlay */}
              <div className="absolute xl:left-40 inset-0 flex flex-col justify-center items-start px-4 md:px-12 pb-4 md:pb-12">
                {/* Content container - adjusts based on screen size */}
                <div className="w-full md:max-w-lg lg:max-w-2xl">
                  {/* Title - responsive font sizing */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight md:leading-[60px] lg:leading-[70px] xl:leading-[80px] text-white mb-3 md:mb-4 drop-shadow-md">
                    {issue.title}
                  </h1>

                  {/* Description - only visible on md screens and up */}
                  <p className="hidden md:block text-xl font-frutiger font-[18px] text-[#fff] mb-4 group-hover:text-[#14213d] transition-colors">
                    {issue.description}
                  </p>

                  {/* Buttons - stack vertically on small screens */}
                  <div className="flex flex-col max-md:hidden sm:flex-row gap-3 md:gap-4">
                    {/* Primary Button */}
                    <button
                      className="
      py-3 px-6 
      text-sm md:text-base 
      bg-[#14213d] hover:bg-[#101b35] 
      font-frutiger font-medium
      text-white  
      rounded-xl 
      transition-all 
      duration-200
      whitespace-nowrap
      shadow-md hover:shadow-lg
      focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
      active:scale-[0.98]
    "
                    >
                      About the Alliance
                    </button>

                    {/* Secondary Button (Outline with Hover Accent) */}
                    <button className=" text-white secondary-button"
                    >
                      Our Results
                    </button>
                  </div>
                </div>

                {/* Mobile-only content panel (slides up from bottom) */}
                <div className="md:hidden     max-md:p-8 ml-6 mr-6 fixed md:bottom-20 max-md:bottom-10  left-0 right-0 bg-black/80 backdrop-blur-sm rounded-t-2xl z-20">
                  <p className="text-xl font-frutiger font-[18px] text-[#fff] mb-4 group-hover:text-[#14213d] transition-colors">{issue.description}</p>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-2 px-4 text-sm font-frutiger text-white bg-[#14213d] rounded-3xl hover:hover:bg-[#101b35] transition
      flex-1 py-3 px-4 
        text-sm font-frutiger font-medium 
        text-white 
        bg-[#14213d] hover:bg-[#101b35] 
        rounded-xl
        transition-all
        duration-200
        active:scale-[0.98]
        shadow-md
      "
                    >
                      About the Alliance
                    </button>
                    <button
                      className=" text-white secondary-button
      "
                    >
                      Our Results
                    </button>
                  </div>
                </div>
              </div>

              {/* Wave shapes at bottom corners */}
              {/* Full-width wave at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-20 flex">
                {/* Left wave */}
                <img
                  src={wave1}
                  alt=""
                  className="absolute -bottom-[3.99px] left-0 h-full w-auto"
                />
                <div className="relative h-full flex-1 left-16 top-1 bg-white"></div>

                {/* White divider - adjust width as needed */}
                <div className="bg-white h-full  top-0"></div>

                {/* Right wave */}
                <div className="relative h-full flex-1 top-1 bg-white">
                  <img
                    src={wave2}
                    alt=""
                    className="absolute bottom-20 right-0 h-full w-auto"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
