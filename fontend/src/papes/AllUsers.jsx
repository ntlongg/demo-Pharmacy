import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../component/UpdateUser';
import { MdDelete } from "react-icons/md";
import DeleteUser from '../component/DeleteUser';
import AddUser from '../component/AddUser';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [open, set] = useState(false);
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })
    const [openAddUser, setOpenopenAddUser] = useState(false);

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    
    <div className='bg-white pb-4 '>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg p-2 ml- '>Tất cả tài khoản</h2>
            <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full flex' onClick={() => setOpenopenAddUser(true)}>Tạo tài khoản</button>
        </div>
        <table className='w-full text-center'>
            <thead>
                <tr className=' bg-green-400 '>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>email</th>
                    <th>Tài Khoản</th>
                    <th>Vai trò</th>
                    <th>Ngày tạo</th>
                    <th>Hoạt động   </th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    allUser.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.account}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                <button
                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mr-5'
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
                    onClick={() => {
                      setUpdateUserDetails(el)
                      set(true)
                    }}
                  >
                    <MdDelete /> {/* Use Delete Icon */}
                  </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
        {
            open && (
                <DeleteUser
                    onClose={()=>set(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
        {openAddUser && <AddUser onClose={() => setOpenopenAddUser(false)} fetchData={fetchAllUsers} />}
    </div>
  )
}

export default AllUsers