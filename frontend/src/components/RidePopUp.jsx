import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[98%] absolute top-0 ' onClick={()=>{
            props.setRidePopUpPanel(false)
          }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
          <h2 className='text-2xl font-semibold mb-5'>New Ride Available!</h2>
          <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
              <img className='h-12 w-12 rounded-full object-cover' src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" alt="" />
              <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " +props.ride?.user.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.1 KM</h5>
          </div>
          <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>Jamuna Future Park</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                  </div>
              </div>

              <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>Jamuna Future Park</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                  </div>
              </div>

              <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
                  <div>
                    <h3 className='text-lg font-medium'>BDT {props.ride?.fare} </h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                  </div>
              </div>
            </div>
            <div className='flex mt-5 w-full items-center justify-between'>
              <button onClick={()=>{
                  props.setRidePopUpPanel(false)
                }} className='mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>

              <button onClick={()=>{
                props.setConfirmRidePopUpPanel(true)
                props.confirmRide()
              }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>

              
            </div>
          
          </div>
    </div>
  )
}

export default RidePopUp
