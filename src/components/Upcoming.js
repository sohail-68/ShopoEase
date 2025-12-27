import React from "react";
import img from "../images/ngo.jpg";

const Upcoming = () => {
  return (
    <div className="max-w-full pt-24 pb-24 flex justify-center items-center  bg-[#edf2f4] mx-auto p-9">
      <div className="flex flex-col md:flex-row max-md:gap-5 justify-center items-center  bg-[#edf2f4] ">
        {/* Text Section */}
       <div className="max-xl:pl-5 max-xl:pr-5 max-w-xl  top-11  xl:relative xl:left-40 max-md:left-14  md:w-1/2 p-10 border-l-8  rounded-l-3xl bg-white shadow-lg">
  {/* Heading */}
  <h1 className="xl:text-[4.5rem] max-xl:text-[3rem] leading-[60px] font-carnero font-normal text-black mb-6">
    Health & Prosperity through Immunisation
  </h1>
  
  {/* Paragraph */}
  <p className="text-lg font-frutiger text-gray-700 leading-relaxed mb-8">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ea
    esse commodi? Excepturi libero reprehenderit enim, aliquid ad eaque
    dolores tempora harum aut obcaecati quisquam earum nostrum
    architecto aliquam ipsa!
  </p>
  
  {/* Button */}
<button className="
  p-3 px-6 
  font-frutiger font-medium 
 bg-[#14213d] 
 text-white
 rounded-xl">
  Learn More
</button>
</div>

        {/* Image Grid Section */}
        <div className="">
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {/* Main Image */}
            <div className="sm:w-1/2">
              <img 
                src={img} 
                alt="NGO event" 
                className="w-full rounded-tl-[19rem] h-full object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Side Images */}
          <div className="sm:w-2/5 flex flex-col gap-4">  {/* Changed from sm:w-1/2 to sm:w-2/5 */}
  <div className="flex-1">
    <img 
      src={img} 
      alt="NGO event" 
      className="w-full h-full rounded-tr-[3rem] object-cover rounded-lg shadow-md"
    />
  </div>
  <div className="flex-1">
    <img 
      src={img} 
      alt="NGO event" 
      className="w-full h-full object-cover rounded-lg shadow-md"
    />
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;