import React from 'react'
import new1 from '../assets/image/new1.jpg';
import new2 from '../assets/image/new2.jpg';
import new3 from '../assets/image/new3.jpg';
import new4 from '../assets/image/new4.jpg';
import new5 from '../assets/image/new5.jpg';

const News = () => {
  return (
    <div className='mr-36 ml-36 bg-white mt-10 border rounded-md'>
        <p className='pl-10 pt-5 text-xl'>Bản tin sức khoẻ</p>

        <div className='flex'>
          <div className='w-96'>
              <img src={new1} alt='new1' className='w-96 h-60 ml-10 mt-7 border rounded-lg'></img>
              <p className=' pl-10'>Nhà thuốc Minh Quân cùng Công ty Santen tổ chức hội thảo Tư Vấn Khô Mắt Và Mỏi Mắt Cho Nhân Viên Văn Phòng Từ Chuyên Gia Nhãn Khoa.</p>
          </div>

          <div>
            <div className='flex w-full'>
              <img src={new2} alt='new2' className='w-36 h-28 ml-16 mt-7 border rounded-lg '></img>
              <p className=' mt-3 pt-10 mb-10 w-64 pl-3 line-clamp-2'>Minh Quân phối hợp cùng Abbott Healthcare Việt Nam nâng cao năng lực tư vấn và giải pháp về rối loạn cương dương cho dược sĩ</p>
            </div>
            <div className='flex w-full'>
              <img src={new3} alt='new2' className='w-36 h-28 ml-16 mt-7 border rounded-lg '></img>
              <p className=' mt-3 pt-10 mb-10 pl-3 w-64  line-clamp-2'>Rau muống bao nhiêu calo? Ăn rau muống có giảm cân không?</p>
            </div>
          </div>

          <div>
            <div className='flex w-full'>
              <img src={new4} alt='new2' className='w-36 h-28 ml-16 mt-7 border rounded-lg '></img>
              <p className=' mt-3 pt-10 mb-10 w-64 pl-3 line-clamp-2'>Sở Y Tế Hà Nội cảnh báo thuốc Zinnat tablets 500mg giả, không đảm bảo chất lượng</p>
            </div>
            <div className='flex w-full'>
              <img src={new5} alt='new2' className='w-36 h-28 ml-16 mt-7 border rounded-lg '></img>
              <p className=' mt-3 pt-10 mb-10 w-64 pl-3 line-clamp-2'>Bị viêm da cơ địa kiêng ăn gì và nên ăn gì để giảm triệu chứng?</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default News