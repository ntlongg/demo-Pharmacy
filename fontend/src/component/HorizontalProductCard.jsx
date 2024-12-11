import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { MdOutlineAddShoppingCart } from "react-icons/md";

const HorizontalProductCard = ({category}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef()


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container w-full min-w-[1500px] md:min-w-[1000px] max-w-[1000px] md:max-w-[1000px] mx-auto px-4 my-5 relative'>
           <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none hover transition-all' ref={scrollElement}>
            <button  className='bg-white  hover:scale-125 shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white hover:scale-125 shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 
            
           {   loading ? (
                loadingList.map(()=>{
                    return(
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
           ) : (
            data.map((product)=>{
                return(
                    <Link to={"product/"+product?._id} className='bg-white '>
                      <div className='flex flex-col '>
                            <img src={product.productImage[0]} className='h-40 w-40 justify-center pt-1'/>
                        
                        <div className='col-md-4 col-sm-6 col-xs-6 pro-loop'>
                            <h2 className='pt-3 font-light text-base md:text-lg text-ellipsis line-clamp-2 text-black pl-2'>{product?.productName}</h2>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium pt-6 pl-6'>{ displayVNDCurrency(product?.price) }</p>
                                <p className='text-slate-500 line-through pt-6 pb-7 pl-6'>{ displayVNDCurrency(product?.sellingPrice)  }</p>
                            </div>
                            <button className='text-2xl text-black border rounded-full border-lime-400 hover:bg-green-600 bg-lime-500  px-16 py-0.5' onClick={(e)=>handleAddToCart(e,product?._id)}><MdOutlineAddShoppingCart /></button>
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

export default HorizontalProductCard