import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate} from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import ROLE from '../common/role';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { BiExit } from "react-icons/bi";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlLogout = async () =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/login')
    }

    if(data.error){
      toast.error(data.message)
    }
    console.log("đã đăng xuất",data)
  }

  useEffect(() => {
    if (user) {
      if (user.role === ROLE.ADMIN) {
        navigate("/admin-panel");
      } else {
        navigate("/personnel-panel");
      }
    }
  }, [user]);
  return (
    <div className='min-h-[calc(117.3vh-120px)] bg-white lg:flex hidden '>
        <aside className='bg-lime-400 min-h-full  w-64  max-w-64 shadow-md  '>
          <div className='h-32  flex justify-center items-center flex-col pt-16 '>
                      <div className='text-5xl cursor-pointer relative flex justify-center'>
                          {
                          user?.profilePic ? (
                              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                          ) : (
                              <FaRegCircleUser/>
                          )
                          }
                      </div>
                      <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                      <p className='text-sm'>{user?.role}</p>
                  </div>
                 {/***navigation */}       
                <div>   
                  <nav className='grid'> 
                    <Link to={"dashboard"} className='flex items-center px-10 py-1 mt-20 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <LuLayoutDashboard className='mr-3'/>Tổng quan</Link> 
                    <Link to={""} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <FiTrendingUp  className='mr-3'/>Báo cáo</Link>                  
                    <Link to={"all-users"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <LuUsers className='mr-3'/>Quản lý nhân sự</Link>
                    <Link to={"all-products"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-2 transition-all duration-300 ease-in-out relative'> <BsBoxSeam className='mr-3'/>Quản lý kho hàng</Link>
                    <Link to={""} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <FiTruck className='mr-3'/>Order</Link>
                  </nav>
                </div> 
                <div onClick={handlLogout} className="cursor-pointer w-3 ml-10 hover:text-white pt-10">
                  <BiExit className="text-3xl"/>
                </div>
        </aside>
        <main className='w-full h-full'>
          <ToastContainer
            position='top-center' />
          <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel