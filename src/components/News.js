import React from 'react';
import img from "../images/ngo.jpg";

const News = () => {
  const boxBgStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight:"300px"
  };

  const newsItems = [
    {
      title: "Global leaders unite to accelerate cervical cancer elimination efforts",
      subtitle: "World Health Assembly",
      date: "May 2025"
    },
    {
      title: "New vaccine partnership announced to combat malaria",
      subtitle: "Global Health Initiative",
      date: "April 2025"
    },
    {
      title: "Annual report shows record immunization rates",
      subtitle: "Progress Report",
      date: "March 2025"
    },
 
  ];

  return (
    <div className='w-full py-16 bg-[#edf2f4]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
                                      <span className="border-b-2 border-black inline-block h-[4px] w-[14rem]  bg-[#14213d]"></span>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12'>
          <div className='mb-6 sm:mb-0'>
            <h3 className="text-3xl mt-8 sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black">
                   Latest News

          </h3>
          </div>
          <button className='secondary-button'>
            View All News
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 max-xl:gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className='group cursor-pointer mt-3'>
              {/* News Card */}
              <div className='h-full flex flex-col'>
                {/* News Title (Above Image) */}
                <h3 className='text-xl font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors'>
                  {item.title}
                </h3>
                
                {/* Image Box */}
                <div 
                  className="relative flex-1 rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-md group-hover:shadow-lg transition-all"
                  style={boxBgStyle}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 group-hover:from-black/70 group-hover:to-black/40 transition-all"></div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  </div>
                </div>
              </div>
              <div className='nav-link mt-2 text-2xl font-carnero text-gray-800 font-semibold '>view more</div>
            </div>
          ))}
        </div>

        {/* View More Button (Mobile Only) */}
        <div className='mt-20 flex justify-start sm:hidden'>
          <button className='secondary-button'>
            View More News
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;