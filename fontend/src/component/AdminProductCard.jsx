import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AdminSeenProduct from '../component/AdminSeenProduct';
import { FaRegEye } from "react-icons/fa";

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)
    const [openseenProduct,setOpenSeenProduct]  = useState(false)

    const handleDelete = async (product) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.productName}" không?`)) {
          const response = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(product)
          });
    
          const responseData = await response.json();
    
          if (responseData.success) {
            toast.success(responseData.message);
            fetchdata();
          } else {
            toast.error(responseData.message);
          }
        } else {
          console.log('Deletion cancelled');
        }
      };
    

  return (
    <div className=' bg-slate-200 p-4 rounded-lg mt-10    '>
       <div className='w-40  '>
            <div className='w-32 h-32 flex justify-center items-center  '>
              <img src={data?.productImage[0]}  className=' w-full h-full object-cover'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            
            <div>

                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.price)
                  }
        
                </p>
                <div className='flex justify-between'>
                  <div className=' w-fit ml-auto p-2 bg-green-200 hover:bg-green-500 hover:text-white rounded-full cursor-pointer' onClick={()=>setEditProduct(true)}>
                      <MdModeEditOutline/>
                  </div>
                  <div className=' w-fit ml-auto p-2 bg-blue-200 hover:bg-green-500 hover:text-white rounded-full cursor-pointer' onClick={()=>setOpenSeenProduct(true)}>
                      <FaRegEye/>
                  </div>
                  <div className='w-fit ml-auto p-2 bg-red-200 hover:bg-red-500 hover:text-white rounded-full cursor-pointer' onClick={() => handleDelete(data)}>
                      <MdDelete/>
                  </div>
                </div>

            </div>

          
       </div>
        
        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
            )
        }
        {
            openseenProduct && (
            <AdminSeenProduct productData={data} onClose={()=>setOpenSeenProduct(false)} fetchdata={fetchdata}/>
            )
        }
    
    </div>
  )
}

export default AdminProductCard