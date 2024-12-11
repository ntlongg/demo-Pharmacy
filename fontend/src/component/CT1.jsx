import React from 'react'
import content2 from '../assets/image/content2.png';
import HorizontalProductCard from './HorizontalProductCard';

const CT1 = () => {
  return (
    <div className='pl-5 pr-5 mb-5 flex justify-between'>
        <div className='bg-green-500 rounded-2xl flex '>
          <div>
            <img src={content2} alt='content2' className='pl-3 pt-3 pb-1 h-96'/>
          </div>

          <div>
            <HorizontalProductCard category={"Tiêu chảy"}/>
          </div>
        </div>
    </div>
  )
}

export default CT1