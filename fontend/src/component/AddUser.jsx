import React, { useState } from 'react';
import { toast } from "react-toastify";
import imageToBase64 from "../helpers/imageToabse64";
import logosignup from "../assets/image/logosignup.gif";
import SummaryApi from '../common';
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";

const AddUser = ({
  onClose,
  fetchData
}) => {
  const [data, setData] = useState({
    password: "",
    name: "",
    account: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      setData((prevData) => ({
        ...prevData,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 {
      const response = await fetch(SummaryApi.createUser.url, {
        method: SummaryApi.createUser.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose()
        fetchData()
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
      console.log("User", responseData);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'
      >
        <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Thêm nhân viên</h2>
             <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                 <CgClose/>
             </div>
         </div>
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-xl">
          <div>
            <img src={data.profilePic || logosignup} alt="logosignup" />
          </div>
          <form>
            <label>
              <div className="text-sm text-center bg-opacity-50 cursor-pointer py-2 bg-slate-200 absolute bottom-0 w-full">
                Tải ảnh lên
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </form>
        </div>

        <form className="" onSubmit={handleSubmit}>
          <div>
            <label>Tên của bạn:</label>
            <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400">
              <input
                type="text"
                placeholder="Nhập tên của bạn.."
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r to-emerald-500 text-black bg-clip-text"
              />
            </div>
          </div>

          <div className="grid">
            <label>Email:</label>
            <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400">
              <input
                type="email"
                placeholder="Vui lòng nhập Tài khoản.."
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r to-emerald-500 text-black bg-clip-text"
              />
            </div>
          </div>

          <div className="grid">
            <label>Tài khoản:</label>
            <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400">
              <input
                type="text"
                placeholder="Vui lòng nhập Tài khoản.."
                name="account"
                value={data.account}
                onChange={handleOnChange}
                required
                className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r to-emerald-500 text-black bg-clip-text"
              />
            </div>
          </div>

          <div>
            <label>Mật khẩu:</label>
            <div className="flex items-center w-full max-w-sm focus-within:shadow-ms mb-2 border rounded-md border-green-400">
              <input
                type={"password"}
                placeholder="Vui lòng nhập Mật khẩu.."
                onChange={handleOnChange}
                required
                name="password"
                value={data.password}
                className="ml-3 w-80 outline-none pl-50 items-center mr-2 bg-gradient-to-r to-emerald-500 text-black bg-clip-text"
              />
            </div>
            <button className="bg-black text-white hover:bg-green-600 hover:text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Đăng ký
              </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddUser;