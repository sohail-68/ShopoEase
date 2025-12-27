import React from "react";
import img from "../images/ngo.jpg";

const About = () => {
  const boxBgStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <di className="hii bg-[#edf2f4]">
      <div className="relative pb-20 w-full ">
        {/* Main Background Image */}

        {/* Content Container */}
        <div className="relative z-20 p-4 sm:p-8 h-full flex flex-col justify-center max-w-7xl mx-auto">
          <div className="w-[5cm] mb-4 overflow-hidden whitespace-nowrap text-transparent select-none">
            <span className="border-b-2 border-black inline-block h-[4px] w-full  bg-[#14213d]"></span>
          </div>

          {/* Header */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black">
            Highlighted content
          </h3>

          {/* Box Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Box 1 */}
            <div
              className="relative p-6 sm:p-8 rounded-lg border border-white/20 hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden group"
              style={boxBgStyle}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  World Health Assembly
                </h3>
                <p className="text-gray-200">May 2025</p>
              </div>
            </div>

            {/* Box 2 */}
            <div
              className="relative p-6 sm:p-8 rounded-lg border border-white/20 hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden group"
              style={boxBgStyle}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Current Strategy
                </h3>
                <p className="text-gray-200">2021-2025</p>
              </div>
            </div>

            {/* Box 3 */}
            <div
              className="relative p-6 sm:p-8 rounded-lg border border-white/20 hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden group"
              style={boxBgStyle}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  About Gavi
                </h3>
                <p className="text-gray-200">The Vaccine Alliance</p>
              </div>
            </div>

            {/* Box 4 */}
            <div
              className="relative p-6 sm:p-8 rounded-lg border border-white/20 hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden group"
              style={boxBgStyle}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Progress Report
                </h3>
                <p className="text-gray-200">Latest updates</p>
              </div>
            </div>

            {/* Box 5 */}
            <div
              className="relative p-6 sm:p-8 rounded-lg border border-white/20 hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden group"
              style={boxBgStyle}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Global Health
                </h3>
                <p className="text-gray-200">Security initiatives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-10">
        {/* Container */}
        <div className="flex  max-md:flex-col md:flex-row gap-6 xl:gap-0">
          {/* Image Section - full width on mobile, half on desktop */}
          <div className="w-full  relative z-0">
            <img
              src={img}
              alt="Gavi's five-year plan"
              className="w-[50rem] h-[300px] sm:h-[400px] xl:h-[500px] object-cover rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg"
            />
          </div>

          {/* Content Section - overlaps on desktop, stacks on mobile */}
          <div className="w-full  xl:w-1/2 relative xl:absolute sm:pt-2 xl:right-0 xl:top-1/2 xl:transform xl:-translate-y-1/2 z-10">
            <div
              className="bg-white flex flex-col 
  p-4 sm:p-6 md:p-8 
  xl:pt-20 xl:pb-20 xl:px-12 
  rounded-2xl shadow-xl border border-gray-100 
  xl:ml-[-10px] 
  space-y-4 sm:space-y-6"
            >
              <span className="border-b-2 border-black inline-block h-[4px] w-[5rem]  bg-[#14213d]"></span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                From Government Solutions to Societal Capabilities
              </h1>
              <p className="text-xl font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors">
                As the DPI debate has evolved over the past couple of years,
                there continues to be a lack of clarity on what DPI is. There
                have been several attempts at coming up with a “definition” by
                various stakeholders, but there is no consensus. Learn more on
                what needs to be done:
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pl-4 items-start">
                <button
                  className="py-3 px-6 
      text-sm md:text-base 
      bg-[#14213d] hover:bg-[#101b35] 
       
      font-frutiger font-medium
      text-white 
      border-2 border-white hover:border-orange-500
      rounded-xl 
      transition-all 
      duration-300
      whitespace-nowrap
      hover:text-orange-100
      active:scale-[0.98]"
                >
                  Current (2021–2025)
                </button>
              <button  className="secondary-button
">
  Next (2026–2030)
</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pb-20 w-full bg-[#fff]">
        {/* Main Background Image */}
        <div
          className="absolute z-10 inset-0 bg-cover bg-center rounded-tl-[5rem] rounded-tr-[1rem] overflow-hidden"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-60"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 mt-[3rem] p-4 sm:p-8 h-full flex flex-col justify-center max-w-7xl mx-auto">
          <div className="w-[5cm] mb-4 overflow-hidden whitespace-nowrap text-transparent select-none">
                          <span className="border-b-2 border-black inline-block h-[4px] w-[14rem]  bg-[#14213d]"></span>

          </div>

          {/* Header */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black">
                     Gavi's impact

          </h3>
          <div className="pb-2 sm:pb-6 mb-8">
          <button className="secondary-button">Download our facts & figures</button>

          </div>

          {/* Box Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[
              {
                number: ">1.1",
                label: "children vaccinated through routine programmes",
              },
              {
                number: ">18.8",
                label: "future deaths averted",
              },
              {
                number: "19",
                label: "countries fully self-financing",
              },
              {
                number: ">250",
                label: "in economic benefits for countries",
              },
              {
                number: "1.9",
                label: "vaccinations through preventive vaccination campaigns",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-6 sm:p-8 rounded-lg hover:shadow-md transition-all rounded-bl-3xl rounded-tr-3xl overflow-hidden "
              >
                <div className="absolute inset-0  group-hover:bg-black/40 transition-all"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#4f4f4e] mb-2 leading-tight">
                    {item.number}
                  </h3>
                  <p className="text-[#1b2b4e] leading-[34px] mb-[10px] text-[2.4rem]">
                    billion
                  </p>
                  <p className="text-lg font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </di>
  );
};

export default About;
