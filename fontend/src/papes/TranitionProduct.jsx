import React, { useState } from 'react';
import Medicine from '../component/Medicine';
import NoMedicine from '../component/NoMedicine';

const TranitionProduct = () => {
  const [openMedicine, setOpenMedicine] = useState(false);
  const [openNoMedicine, setOpenNoMedicine] = useState(false);

  return (
    <div>
      <div className='flex border rounded justify-around'>
        <div className=''>
          <button className='' onClick={() => { setOpenMedicine(true); setOpenNoMedicine(false); }}>
            Lập hoá đơn kê đơn
          </button>
        </div>

        <div className=''>
          <button className='' onClick={() => { setOpenNoMedicine(true); setOpenMedicine(false); }}>
            Lập hoá đơn không kê đơn
          </button>
        </div>
      </div>
      <div>
        {openMedicine && <Medicine onClose={() => setOpenMedicine(false)} />}
        {openNoMedicine && <NoMedicine onClose={() => setOpenNoMedicine(false)} />}
      </div>
    </div>
  );
}

export default TranitionProduct;