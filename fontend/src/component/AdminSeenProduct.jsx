import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import DisplayImage from './DisplayImage';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminSeenProduct = ({
  onClose,
  productData,
}) => {
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [data] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    status: productData?.status,
    cla: productData?.classify // Fixed typo here
  });

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'
      >
        <button className='block ml-auto' onClick={onClose}>
          <CgClose />
        </button>

        <h1 className='pb-4 text-lg font-medium'>Thông tin sản phẩm</h1>
        <div className='m-5'>
          <p className='flex'>Tên sản phẩm: {data.productName}</p>
          <p className='flex'>Mã sản phẩm: {data.brandName}</p>
          <p className='flex mr-7'>Loại sản phẩm: {data.category}</p>
          <p className='flex'>Ảnh sản phẩm: {
            data.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {
                  data.productImage.map((el) => (
                    <div key={el} className='relative group'>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className='bg-slate-100 border cursor-pointer'
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Vui lòng tải ảnh sản phẩm lên</p>
            )
          }</p>
          <p className='font-semibold flex'>Giá: {displayINRCurrency(data.price)}</p>
          <p className='flex'>Trạng thái: {data.status}</p>
          <p className='flex'>Phân loại: {data.cla}</p>
        </div>
      </motion.div>
      {/***display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }
    </div>
  );
};

export default AdminSeenProduct;