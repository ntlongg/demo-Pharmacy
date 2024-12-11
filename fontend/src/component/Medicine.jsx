import React from 'react'

const Medicine = () => {
  return (
    <div className='pt-4 pl-5'>
        <div className='pt- border rounded-sm shadow-sm w-64'>
            <h1 className='text-center'>
                Thông tin khách hàng
            </h1>
            <p className='pb-3'>Tên : <input type="text"  className='border px-2 py-1 pb-' /></p>
            <p>Email : <input type="text" className='border px-2 py-1' /></p>
        </div> 
    </div>
  )
}

export default Medicine