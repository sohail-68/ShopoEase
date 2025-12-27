import React from 'react'
import img from "../images/ngo.jpg";

const Vaccines = () => {
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
    <div className='bg-[#ffff]'>
          <div className='w-full py-16 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[6rem]'>
          <div className=' sm:mb-0'>
            <div className='w-16 mb-5'>
                          <span className="border-b-2 border-black inline-block h-[4px] w-[14rem]  bg-[#14213d]"></span>

            </div>
             <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black">
         VaccinesWork
          </h3>
          
          </div>
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
   View All News
  </button>
        </div>

        {/* News Grid */}



    <div className='relative w-full max-w-7xl  mx-auto md:px-4 max-md:px-1 xl:py-10 max-xl:py-1'>
        <div className=" flex xl:flex-row-reverse  md:flex-row max-md:flex-col md:gap-6 max-md:gap-2 pl-3 md:mb-[6em] max-md:mb-[6rem]  max-w-screen-xls justify-between items-start">
    
    <div className="w-full xl:w-1/2 relative xl:absolute sm:pt-2 xl:left-0 xl:top-[10rem] xl:transform xl:-translate-y-[2rem] z-10">
    <div className='bg-white flex flex-col 
    p-4 sm:p-6 md:p-8 
    xl:pt-20 xl:pb-20 xl:px-12 
    rounded-2xl shadow-xl border border-gray-100 
    xl:ml-[-10px] 
    space-y-4 sm:space-y-6
    
    '>
        <div className="mt-7">
          <span className="border-b-2 border-black inline-block h-[4px] w-[10rem]  bg-[#14213d]"></span>
        </div>

       <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-carnero leading-tight text-gray-900">
          What is VaccinesWork?
        </h3>
    
        <p className="text-xl font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors">
        VaccinesWork is an award-winning digital platform hosted by Gavi, the Vaccine Alliance, covering news, features, and explainers from every corner of global health and immunisation.
        </p>

        <div>
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
        </div>
    </div>
    </div>

    <div className="flex">
        <img 
        src={img} 
        alt="" 
        className="rounded-tl-[5rem] rounded-br-[5rem]   md:h-[70vh] max-sm:h-[40vh] object-cover"
        />
    
    </div>

    </div>
    </div>


                                 <span className="border-b-2 border-black inline-block h-[4px] w-[10rem]  bg-[#14213d]"></span>
 <h3 className="text-3xl mt-6 sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black">
                    VaccinesWork latest

          </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 max-xl:gap-9">
          {newsItems.map((item, index) => (
            <div key={index} className='group cursor-pointer  mt-3'>
              {/* News Card */}
              <div className='h-full flex flex-col'>

                {/* News Title (Above Image) */}
                <p className='text-xl font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors'>
                  {item.title}
                </p>
                
                {/* Image Box */}
                <div 
                  className="relative flex-1 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all"
                  style={boxBgStyle}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 group-hover:from-black/70 group-hover:to-black/40 transition-all"></div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <h4 className='text-lg font-semibold text-white'>{item.subtitle}</h4>
                    <p className="text-gray-200 mt-1">{item.date}</p>
                  </div>
                </div>
              </div>
              <div className='nav-link mt-2 text-2xl font-carnero text-gray-800 font-semibold '>view more</div>
            </div>
          ))}
        </div>

        {/* View More Button (Mobile Only) */}
       
      </div>
    </div>
    </div>
  )
}

export default Vaccines