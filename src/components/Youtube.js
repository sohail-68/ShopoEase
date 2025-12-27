import React from 'react';
import img from "../images/img1.png";
const Youtube = () => {
  const videos = [
    {
      id: 1,
      title: "Highlight Reel from the Global DPI Summit ",
      videoId: "wo_QLbEXg2I",
      views: "1.2K views",
      time: "2024 - Cairo, Egypt"
    },
    {
      id: 2,
      title: "Keynote Address by Nandan Nilekani - ",
      videoId: "uZvA-XRhMIo",
      views: "3.4K views",
      time: "Cairo, Egypt"
    },
    {
      id: 3,
      title: "Co-Develop CEO C.V. Madhukar on AI and #DPI: Building Trust in Digital Systems",
      videoId: "4NuGK-X4tcU",
      views: "5.6K views",
      time: ""
    },
  ];

  // Function to get YouTube thumbnail URL
  const getThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-center mx-auto xl:gap-4 max-w-4xl items-center'>  <img src={img} alt="" />
      <h2 className="text-xl sm:text-4xl md:text-3xl font-bold mb-6 sm:mb-8 text-black">
     Highlights from the Global DPI Summit
      2024
        </h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
           <div key={video.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
  <div className="relative pb-[56.25%] bg-gray-200">
    <iframe 
      className="absolute h-full w-full"
      src={`https://www.youtube.com/embed/${video.videoId}`} 
      title={video.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
  <div className="p-4">
    <h3 className="text-xl font-frutiger font-semibold text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors">{video.title}</h3>
    <div className="flex items-center text-sm text-gray-600">
      <span className='text-xl font-frutiger font-[18px] text-[#14213d] mb-4 group-hover:text-[#14213d] transition-colors'>{video.time}</span>
    </div>
  </div>
</div>

        ))}
      </div>
      <div className='flex justify-center items-center p-3'>
      <button className='secondary-button '>from More the Submit</button>

      </div>
    </div>
  );
};

export default Youtube;