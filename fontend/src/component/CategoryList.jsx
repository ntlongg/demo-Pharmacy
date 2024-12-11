import React from 'react';
import { Link } from 'react-router-dom';
import category1 from '../assets/image/category1.png';
import category2 from '../assets/image/category2.png';
import category3 from '../assets/image/category3.png';
import category4 from '../assets/image/category4.png';
import category5 from '../assets/image/category5.png';
import category6 from '../assets/image/category6.png';
import category7 from '../assets/image/category7.png';

const CategoryList = () => {
    return (
        <div className='container mx-auto p-8 pl-44 pr-44'>
            <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none pb-2'>
                {/* Dược phẩm */}
                <Link to={"/product-category?category=Dược%20mỹ%20phẩm"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category1} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Dược mỹ phẩm</p>
                </Link>
                {/* Vitamin và khoáng chất*/}
                <Link to={"/product-category?category=Vitamin%20và%20khoáng%20chất"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category2} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Vitamin và khoáng chất</p>
                </Link>
                {/* Chăm sóc cá nhân*/}
                <Link to={"/product-category?category=Chăm%20sóc%20cá%20nhân"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category3} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Chăm sóc cá nhân</p>
                </Link>
                {/* Chăm sóc trẻ em */}
                <Link to={"/product-category?category=Chăm%20sóc%20trẻ%20em"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category4} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Chăm sóc trẻ em</p>
                </Link>
                {/*Dụng cụ y tế */}
                <Link to={"/product-category?category=Dụng%20cụ%20y%20tế"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category5} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Dụng cụ y tế</p>
                </Link>
                {/* Bố phế, hô hấp*/}
                <Link to={"/product-category?category=Bố%20phế,%20hô%20hấp"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category6} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Bố phế, hô hấp</p>
                </Link>
                {/* Hỗ trợ tim mạch */}
                <Link to={"/product-category?category=Hỗ%20trợ%20tim%20mạch"} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-28 md:h-28 overflow-hidden p-4 bg-white border rounded-full border-green-600 flex items-center justify-center'>
                        <img src={category7} alt='Category 1' className='h-full object-scale-down hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center hover:text-white text-sm md:text-base capitalize'>Hỗ trợ tim mạch</p>
                </Link>
            </div>
        </div>
    );
}

export default CategoryList;