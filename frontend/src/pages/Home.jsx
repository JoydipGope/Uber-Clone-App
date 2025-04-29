import React, {useRef, useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const  [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRaf = useRef(null)
  const confirmRidePanelRaf = useRef(null)
  const vehicleFoundRaf = useRef(null)
  const waitingForDriverRaf = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        padding:25
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])  

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRaf.current, {
        transform:'translateY(0)'
      })
    } else{
      gsap.to(vehiclePanelRaf.current, {
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRaf.current, {
        transform:'translateY(0)'
      })
    } else{
      gsap.to(confirmRidePanelRaf.current, {
        transform:'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRaf.current, {
        transform:'translateY(0)'
      })
    } else{
      gsap.to(vehicleFoundRaf.current, {
        transform:'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRaf.current, {
        transform:'translateY(0)'
      })
    } else{
      gsap.to(waitingForDriverRaf.current, {
        transform:'translateY(100%)'
      })
    }
  },[waitingForDriver])



  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }}>
                <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full"></div>
                <input 
                onClick={()=>{
                  setPanelOpen(true)
                }}
                value={pickup}
                onChange={(e)=>{ 
                  setPickup(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
                type="text" 
                placeholder='Add a pick-up location'
                />

                <input 
                onClick={()=>{
                  setPanelOpen(true)
                }}
                value={destination}
                onChange={(e)=>{ 
                  setDestination(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
                type="text" 
                placeholder='Enter your destination'
                />
            </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
              <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

        <div ref={vehiclePanelRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>

        <div ref={confirmRidePanelRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>

        <div ref={waitingForDriverRaf} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>
    </div>
  )
}

export default Home
