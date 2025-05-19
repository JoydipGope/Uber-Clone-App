import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, { 
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false)
            props.setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
      } catch (error) { 
        console.error('Start ride error:', error)
      }
  }
  return (
    <div>
      <h5 className='p-1 text-center w-[98%] absolute top-0 ' onClick={()=>{
            props.setRidePopUpPanel(false)
          }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
          <h2 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h2>
          <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
              <img className='h-12 w-12 rounded-full object-cover' src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" alt="" />
              <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
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
            <div className='mt-6 w-full'>
              <form onSubmit={submitHandler}>
                <input value={otp} onChange={(e)=> setOtp(e.target.value)} type="text" className='bg-[#eee] px-16 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                <button className='w-full mt-5 flex justify-center bg-green-600 text-white text-lg font-semibold p-3 rounded-lg'>Confirm</button>

                <button onClick={()=>{
                  props.setConfirmRidePopUpPanel(false)
                  props.setRidePopUpPanel(false)
                }} className='w-full mt-2 bg-red-600 text-white text-lg font-semibold p-3 rounded-lg'>Cancel</button>
              </form>
            </div>
          
          </div>
    </div>
  )
}

export default ConfirmRidePopUp
