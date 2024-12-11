import React, { useEffect, useState } from 'react';
import image1 from '../assets/image/banner1.webp';
import image2 from '../assets/image/banner2.webp';
import image3 from '../assets/image/banner3.webp';
import image4 from '../assets/image/banner4.webp';
import bannersub from '../assets/image/banner-sub.jpg';
import bannersub2 from '../assets/image/bannersub1.png';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);


  const desktopImages = [image1, image2, image3, image4];

  const nextImage = () => {
    if (currentImage < desktopImages.length - 1) {
      setCurrentImage(prevState => prevState + 1);
    } else {
      setCurrentImage(0); // Reset to the first image
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(prevState => prevState - 1);
    } else {
      setCurrentImage(desktopImages.length - 1); // Wrap around to the last image
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className='container mx-auto px-5 pr-40 pl-40 pt-24 rounded flex justify-between gap-5  '>
        <div className='w-screen h-72 md:h-96 relative z-10'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white hover:bg-pink-400 hover:scale-125 shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white hover:bg-pink-400 hover:scale-125 shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>

                {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>
        </div>

        <div className='flex flex-col'>
          <a href="/" className=' '>
            <img className="w-96 h-48" src={bannersub} alt="logo"/>
          </a>
          <div>
            <img className="pt-5 w-96 h-48" src={bannersub2} alt="logo"/>
          </div>
        </div>

    </div>
  )
}

export default BannerProduct;
