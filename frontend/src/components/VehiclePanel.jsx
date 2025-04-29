import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[98%] absolute top-0 ' onClick={()=>{
            props.setVehiclePanel(false)
          }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h2 className='text-2xl font-semibold mb-5'>Select a ride</h2>
            <div onClick={()=>{
              props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
              <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/can-1-person-use-uberx.jpg" alt="" />
              <div className=' w-1/2'>
                <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i></span>4</h4>
                <h5 className='font-medium text-sm'>5 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable outstation rides in compact cars</p>
              </div>
              <h2 className='text-lg font-semibold'>BDT 610.08</h2>
            </div>

            <div onClick={()=>{
              props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
              <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
              <div className=' w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i></span>1</h4>
                <h5 className='font-medium text-sm'>3 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
              </div>
              <h2 className='text-lg font-semibold'>BDT 186.58</h2>
            </div>

            <div onClick={()=>{
              props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
              <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
              <div className=' w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i></span>3</h4>
                <h5 className='font-medium text-sm'>6 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
              </div>
              <h2 className='text-lg font-semibold'>BDT 386.38</h2>
            </div>
    </div>
  )
}

export default VehiclePanel
