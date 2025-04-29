import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[98%] absolute top-0 ' onClick={()=>{
            props.waitingForDriver(false)
          }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

          <div className='flex items-center justify-between'>
          <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/can-1-person-use-uberx.jpg" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Joydip</h2>
            <h4 className='text-xl font-semibold -mb-1 -mt-1'>MP 04 ZX 8788</h4>
            <p className='text-sm text-gray-600'>Toyota Crown</p>
          </div>
          </div>

          <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>Jamuna Future Park</h3>
                    <p className='text-sm -mt-1 text-gray-600'>KA-244, Kuril, Progoti Shoroni, Dhaka</p>
                  </div>
              </div>

              <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>Jamuna Future Park</h3>
                    <p className='text-sm -mt-1 text-gray-600'>KA-244, Kuril, Progoti Shoroni, Dhaka</p>
                  </div>
              </div>

              <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
                  <div>
                    <h3 className='text-lg font-medium'>BDT 193.28 </h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                  </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default WaitingForDriver
