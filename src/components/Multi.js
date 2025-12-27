import React from 'react';
import multiple from "../images/multipel.png";

const Multi = () => {
  return (
    <div className="container  px-4 py-8">
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        
        <h2 className="text-md sm:text-3xl md:text-xl font-bold text-center md:text-left text-[#14213d]">
          Founding Partners:
        </h2>
        
   <img 
  src={multiple} 
  alt="Founding Partners" 
  className=" xl:w-[90%] lg:w-[90%] max-lg:w-[80%]  h-auto object-contain"
/>

        
      </div>
      
    </div>
  );
};

export default Multi;
