import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import statusCategory from '../helpers/statusCategory';
import classifyCategory from '../helpers/classifyCategory';



const UploadProduct = ({ 
  onClose,
  fetchData
}) => {
    const [data,setData] = useState({
      productName : "",
      brandName : "",
      category : "",
      productImage : [],
      description : "",
      price : "",
      status: "",
      classify: "",
      sellingPrice : "",
  })
  
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage] = useState("")

  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }
  
  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
    }


    if(responseData.error){
      toast.error(responseData?.message)
      onClose()
      
    }
}          

    return (
      <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

          <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden '>

              <div className='flex justify-between items-center pb-3'>
                  <h2 className='font-bold text-lg'>Tải lên sản phẩm</h2>
                  <button className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                  <CgClose/>
                  </button>     
                             
              </div>
              <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

                  <label htmlFor='productName' className='mt-3'>Tên thuốc :</label>
                  <input 
                  type='text' 
                  id='productName' 
                  placeholder='Nhập tên thuốc' 
                  name='productName'
                  value={data.productName} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  required
                  />

                  <label htmlFor='brandName' className='mt-3'>Mã thuốc :</label>
                  <input 
                  type='text' 
                  id='brandName' 
                  placeholder='Nhập mã thuốc' 
                  value={data.brandName} 
                  name='brandName'
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  required
                  />

                  <label htmlFor='category' className='mt-3'>Loại thuốc :</label>
                  <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                    <option value={""}>Chọn loại thuốc</option>
                    {
                      productCategory.map((el,index)=>{
                        return(
                          <option value={el.id} key={el.value+index}>{el.label}</option>
                        )
                      })
                    }
                  </select>

                  <label htmlFor=' quantity' className='mt-3'>Số lượng :</label>
                  <input 
                      type='number' 
                      id=' quantity' 
                      placeholder='enter selling price' 
                      value={data. quantity} 
                      name='quantity'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'                      
                  />

                  <label htmlFor='price' className='mt-3'>Giá tiền :</label>
                  <input 
                      type='number' 
                      id='price' 
                      placeholder='Nhập giá thuốc' 
                      value={data.price} 
                      name='price'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                  />

                  <label htmlFor='sellingPrice' className='mt-3'>Giá giảm :</label>
                  <input 
                      type='number' 
                      id='sellingPrice' 
                      placeholder='enter selling price' 
                      value={data.sellingPrice} 
                      name='sellingPrice'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'                      
                  />

                  <label htmlFor='status' className='mt-3'>Trạng thái :</label>
                  <select required value={data.status} name='status' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                  <option value={""}>Chọn trạng thái</option>
                  {
                    statusCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
                  </select>


                  <label htmlFor='classify' className='mt-3'>Phân loại :</label>
                  <select required value={data.classify} name='classify' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                  <option value={""}>Chọn phân loại</option>
                  {
                    classifyCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
                  </select>

                  <label htmlFor='description' className='mt-3 h-full'>Ghi chú :</label>
                  <textarea 
                      className='h-28 bg-slate-100 border rounded-sm resize-none p-1' 
                      placeholder='Nhập ghi chú' 
                      rows={3} 
                      onChange={handleOnChange} 
                      name='description'
                      value={data.description}>
                  </textarea>   
                  <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
              </form>
    
          </div>




            {/***display image full screen */}
          {
            openFullScreenImage && (
              <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
          }
      </div>
    )
}

export default UploadProduct