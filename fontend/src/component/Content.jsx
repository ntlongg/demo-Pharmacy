import React, { useState, useEffect } from 'react';
import CT1 from './CT1';
import CT2 from './CT2';
import CT3  from './CT3';

const Content = () => {
    const [openContent1, setOpenContent1] = useState(true);
    const [openContent2, setOpenContent2] = useState(false);
    const [openContent3, setOpenContent3] = useState(false);
    const [activeButton, setActiveButton] = useState('CT1');

    const openCT1 = () => {
        setOpenContent1(true);
        setOpenContent2(false);
        setOpenContent3(false);
        setActiveButton('CT1');
    };

    const openCT2 = () => {
        setOpenContent1(false);
        setOpenContent2(true);
        setOpenContent3(false);
        setActiveButton('CT2');
    };

    const openCT3 = () => {
        setOpenContent1(false);
        setOpenContent2(false);
        setOpenContent3(true);
        setActiveButton('CT3');
    };

    useEffect(() => {
        // Mặc định mở CT1 khi component được tạo
        openCT1();
    }, []);

    return (
        <div className=' bg-white mt-5 border rounded-lg mr-36 ml-36'>
            <div className='flex pl-10 '>
                <div className='pt-12 flex'>
                    <a className='text-xl w-48 h-10'>Bệnh phổ biến mùa này</a>
                </div>

                <div className='pt-12 pl-10'>
                    <button className={`text-xl w-48 h-10 focus:text-white focus:bg-green-500 border-none rounded-t-xl ${activeButton === 'CT1' ? 'text-white bg-green-500' : ''}`} onClick={openCT1}>Bệnh tiêu chảy</button>
                </div>

                <div className='pt-12 pl-10'>
                    <button className={`text-xl w-48 h-10 focus:text-white focus:bg-green-500 border border-none rounded-t-xl ${activeButton === 'CT2' ? 'text-white bg-green-500' : ''}`} onClick={openCT2}>Bệnh viêm họng</button>
                </div>

                <div className='pt-12 pl-10'>
                    <button className={`text-xl w-48 h-10 focus:text-white focus:bg-green-500 border-none rounded-t-xl ${activeButton === 'CT3' ? 'text-white bg-green-500' : ''}`} onClick={openCT3}>Bệnh sốt xuất huyết</button>
                </div>
            </div>

            {openContent1 && <CT1 onClose={() => setOpenContent1(false)} />}
            {openContent2 && <CT2 onClose={() => setOpenContent2(false)} />}
            {openContent3 && <CT3 onClose={() => setOpenContent3(false)} />}
        </div>
    );
}

export default Content;