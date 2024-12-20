import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import UploadProduct from '../component/UploadProduct';
import AdminProductCard from '../component/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Danh sách sản phẩm </h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full flex' onClick={() => setOpenUploadProduct(true)}>Tải lên sản phẩm</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(117vh-190px)] ml-20 overflow-y-scroll '>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>

      {/**upload prouct component */}
      
      <div>
        {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)}/>}
      </div>
    </div>
  );
};

export default AllProducts;