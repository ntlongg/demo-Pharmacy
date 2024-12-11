import React from 'react'
import content5 from '../assets/image/content5.png';
import HorizontalCardProduct from './HorizontalCardProduct';

const CT4 = () => {
  return (
    <div className='h-full pr-36 pl-36 pt-10'>
        <div>
            <img src={content5} alt='content5' className='min-w-[1234px]'/>
        </div>

        <div className='bg-red-600 border-b rounded-lg'>
            <HorizontalCardProduct category={"Dược mỹ phẩm"}/>
        </div>
    </div>
  )
}

export default CT4