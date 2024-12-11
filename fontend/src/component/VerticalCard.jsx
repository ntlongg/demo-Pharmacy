import React, { useContext } from 'react'

import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import displayVNDCurrency from '../helpers/displayCurrency'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

  return (
    <div className=' container pt-5'>
      <div className='flex flex-wrap  gap-12 pl-32 justify-center'>

           {  loading ? (
                loadingList.map(()=>{
                    return(
                        <div className='w-full flex flex-col min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-slate-400 rounded-sm shadow flex'>
                            <div className='bg-slate-400 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>                           
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-400 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-400 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-400 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-400 w-full animate-pulse rounded-full'></p>                          
                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-400 animate-pulse'></button>
                            </div>
                        </div>
                        </div>
                    )
                })
           ) : ( 
            data.map((product)=>{
                return(
                    <Link to={"/product/"+product?._id} >
                      <div className='long flex flex-col w-44'>
                            <img src={product.productImage[0]} className='h-40 w-40 justify-center hover:scale-110 transition-all'/>
                        
                        <div className='col-md-4 col-sm-6 col-xs-6 pro-loop'>
                            <h2 className='font-light text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{ displayVNDCurrency(product?.price) }</p>
                                <p className='text-slate-500 line-through'>{ displayVNDCurrency(product?.sellingPrice)  }</p>
                            </div>
                            <button className=' text-2xl text-black border rounded-full border-lime-400 hover:bg-green-600 bg-lime-500  px-16 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}><MdOutlineAddShoppingCart /></button>
                        </div>
                      </div>
                    </Link>
                )
            })
          )
          }
      </div>
            

    </div>
  )
}

export default VerticalCard