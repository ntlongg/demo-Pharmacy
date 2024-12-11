import React, {useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { Link } from 'react-router-dom'
import displayVNDCurrency from '../helpers/displayCurrency'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import addToCart from '../helpers/addToCart';
import Context from '../context'


const HorizontalCardProduct = ({category}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)


    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }
    const handleAddToCart = async(e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
      }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className=' container pt-5'>
      <div className='flex flex-wrap gap-12 justify-center'>
           {  loading ? (
                loadingList.map(()=>{
                    return(
                        <div className='w-full flex-col min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-slate-400 rounded-sm shadow flex'>
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
                    <Link to={"product/"+product?._id} className=''>
                      <div className=' flex flex-col w-44 pb-3'>  
                        <div className='col-md-4 col-sm-6 col-xs-6 pro-loop bg-white h-80 border rounded-xl'>
                            <img src={product.productImage[0]} className='h-40 w-40 pt-2 justify-center'/>
                            <h2 className='font-light text-base md:text-lg text-ellipsis line-clamp-2 text-black pt-5'>{product?.productName}</h2>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium pt-2 pl-10'>{ displayVNDCurrency(product?.price) }</p>
                                <p className='text-slate-500 line-through pt-2 pb-3'>{ displayVNDCurrency(product?.sellingPrice)  }</p>
                            </div>
                                <button className='text-2xl text-black border rounded-xl border-lime-400 hover:bg-green-600 bg-lime-500  px-16 py-0.5' onClick={(e)=>handleAddToCart(e,product?._id)}>
                                    <div className='pl-4'>
                                        <MdOutlineAddShoppingCart/>
                                    </div>
                                </button>

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

export default HorizontalCardProduct