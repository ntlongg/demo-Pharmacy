import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosEye } from 'react-icons/io';
import { FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AppContext from '../context';
import SummaryApi from '../common';
import FloatingShape from '../component/FloatingShape';

import logologin from '../assets/image/logologin.gif';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(AppContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.signIN.url, {
        method: SummaryApi.signIN.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        fetchUserDetails();
        fetchUserAddToCart();
        navigate('/');
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi trong quá trình đăng nhập.');
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container pt-2 bg-black min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='p-3 w-full max-w-sm mx-auto rounded-sm shadow-2xl'
        >
          <div className='w-20 h-20 mx-auto rounded-full bg-red-100'>
            <img src={logologin} alt='login icon' />
          </div>

          <form className='' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Tài khoản :</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400 '>
                <input
                  type='text'
                  placeholder='Vui lòng nhập Tài khoản..'
                  name='account'
                  value={data.account}
                  onChange={handleOnChange}
                  required
                  className='ml-3 w-80 outline-none pl-50 items-centerbg-gradient-to-r to-emerald-500 bg-clip-text'
                />
              </div>
            </div>

            <div>
              <label>Mật khẩu:</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms mb-2 border rounded-md border-green-400'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Vui lòng nhập Mật khẩu..'
                  onChange={handleOnChange}
                  required
                  name='password'
                  value={data.password}
                  className='ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r to-emerald-500 text-black bg-clip-text'
                />
                <div className='text-xl cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>{showPassword ? <IoIosEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-white'>
                Bạn quên mật khẩu?
              </Link>
            </div>

            <div>
              <button
                type='submit'
                className='bg-black text-white hover:bg-green-600 hover:text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <p className='my-5'>
            Bạn chưa có tài khoản? <Link to={'/signup'} className='text-white hover:text-red-700 hover:underline'>Đăng ký</Link>{' '}
          </p>
        </motion.div>
        <div className='fixed bottom-4 right-1 boder h-16 w-16 rounded-full bg-lime-400 text-2xl z-30'>
          <div className='p-5 text-white hover:scale-150 transition-all object-scale-down hover:text-green-500'>
            <FiPhoneCall />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;