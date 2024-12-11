import React from 'react';
import CategoryList from '../component/CategoryList';
import BannerProduct from '../component/BannerProduct';
import content1 from '../assets/image/content1.png';
import Content from '../component/Content';
import CT4 from '../component/CT4';
import News from '../component/News';
import banner1 from '../assets/image/banner1.png';
import Footer from '../component/Footer';
import { FiPhoneCall } from 'react-icons/fi';


const Home = () => {
  return (
    <div className='bg-slate-100'>
      <BannerProduct />
      <CategoryList/>
      <img src={content1} alt='content1' className='h-full pr-36 pl-36'/>
      <Content/>
      <CT4/>
      <News/>
      <img src={banner1} alt='banner1' className='h-full pt-5'/>
      <Footer/>
      <div className='fixed bottom-4 right-1 boder h-16 w-16 rounded-full bg-lime-400 text-2xl z-30'>
          <div className='p-5 text-white hover:scale-150 transition-all object-scale-down hover:text-green-500'>
            <FiPhoneCall />
          </div>
        </div>
    </div>

  );
}

export default Home;