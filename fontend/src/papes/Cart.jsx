import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayVNCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import emptycart from '../assets/image/empty-cart.svg';
// import { toast } from 'react-toastify'
import Oder from'../component/Oder'



const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const [openOder, setOpenOder] = useState(false);

    const handleopenOder = () => {
        setOpenOder(true);
        
    };

    // const handleAddToInvoice = async() =>{
    //     const response = await fetch(SummaryApi.infomationCart.url,{
    //         method : SummaryApi.infomationCart.method,
    //         credentials : 'include',
    //         headers : {
    //             "content-type" : 'application/json'
    //         },
    //         body : JSON.stringify(
    //             { cartItems: data}
    //         )
    //     })
    //     const responseData = await response.json()
    
    //     if(responseData.success){
    //         toast.success(responseData.message)
    //     }
    
    //     if(responseData.error){
    //         toast.error(responseData.message)
    //     }
    
    
    //     return responseData
    
    // }
    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        const fetchDataAndUpdateLoading = async () => {
            setLoading(true);
            await handleLoading();
            setLoading(false);
        };
        fetchDataAndUpdateLoading();
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ 
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const handlePaymentOnline = async () => {
        const minAmount = 1000;
        const maxAmount = 1000000000000;
    
        if (totalPrice < minAmount || totalPrice > maxAmount) {
            alert(`Amount must be between ${minAmount} ₫ and ${maxAmount} ₫`);
            return;
        }
    
        try {
            const response = await fetch(SummaryApi.Cartpaymemt.url, {
                method: SummaryApi.Cartpaymemt.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ amount: totalPrice })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            window.location.href = responseData.payUrl;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.price), 0);

    return (
        <div className='container mx-auto pt-20 flex justify-center items-center'>
            <div className='text-center text-lg'>
                {data.length === 0 && !loading && (
                    <div>
                        <div className='pl-32'>
                            <img src={emptycart} alt='emptycart' className='w-24 pt-36' />
                        </div>
                        <div className='pt-3'>
                            <p className='pt-3'>Oops! Giỏ thuốc của bạn chưa có sản phẩm nào!</p>
                        </div>
                        <div className='pt-4'>
                            <Link to='/'>
                                <button className='border rounded-sm border-green-400 w-96 h-10'>
                                    <p>Về trang chủ Minh Quân</p>
                                </button>
                            </Link>
                        </div>
                        <div className='pt-4'>
                            <p className='text-sm'>Khi cần trợ giúp vui lòng gọi 1900 1572 (8h00 - 21h30)</p>
                        </div>
                    </div>
                )}
            </div>


                {/*Sản phẩm*/}
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {(
                        data.map((product) => (
                            <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                        <MdDelete />
                                    </div>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{displayVNCurrency(product?.productId?.price)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayVNCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>  
            </div>


            <div className='flex relative'>
                 {/*Hoá đơn*/}
                 {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div>
                            <div>
                        <div className='pl-32'>
                            <img src={emptycart} alt='emptycart' className='w-24 pt-36' />
                        </div>
                        <div className='pt-3'>
                            <p className='pt-3'>Oops! Giỏ thuốc của bạn chưa có sản phẩm nào!</p>
                        </div>
                        <div className='pt-4'>
                            <Link to='/'>
                                <button className='border rounded-sm border-green-400 w-96 h-10'>
                                    <p>Về trang chủ Minh Quân</p>
                                </button>
                            </Link>
                        </div>
                        <div className='pt-4'>
                            <p className='text-sm'>Khi cần trợ giúp vui lòng gọi 1900 1572 (8h00 - 21h30)</p>
                        </div>
                    </div>
                        </div>
                    ) : (
                        <div className='h-36 bg-slate-100'>
                            <h2 className='text-white text-center bg-red-600 px-4 py-1'>Hoá đơn</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Số lượng</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Tổng tiền</p>
                                <p>{displayVNCurrency(totalPrice)}</p>
                            </div>
                            <div className='flex'>
                            <button className='bg-blue-600 p-4 text-white border-r w-full mt-2' onClick={handleopenOder}>Thanh toán khi nhận hàng </button>
                            <button className='bg-blue-600 p-4 text-white w-full mt-2' onClick={handlePaymentOnline}>Ví điện tử momo</button>
                            </div>
                        </div>
                    )}
                </div>
                    )
                 }
            </div>
            <div className='flex absolute top-5'>
                {openOder && <Oder onClose={() => setOpenOder(false)}/>}
            </div>
        </div>
    );
};

export default Cart;