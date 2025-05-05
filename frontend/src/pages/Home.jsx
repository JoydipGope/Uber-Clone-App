import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRaf = useRef(null)
  const confirmRidePanelRaf = useRef(null)
  const vehicleFoundRaf = useRef(null)
  const waitingForDriverRaf = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)




  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
    }
}

const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data)
  } catch {
      // handle error
  }
}


  const submitHandler = (e) => {
    e.preventDefault()
  }

  // const fetchSuggestions = async (query) => {
  //   try {
  //     const response = await axios.get(`http://localhost:PORT/suggestions`, {
  //       params: { query }
  //     })
  //     setSuggestions(response.data)
  //   } catch (error) {
  //     console.error('Error fetching suggestions:', error)
  //   }
  // }

  // const handleInputChange = (e, field) => {
  //   const value = e.target.value
  //   if (field === 'pickup') {
  //     setPickup(value)
  //   } else {
  //     setDestination(value)
  //   }
  //   setActiveField(field)
  //   fetchSuggestions(value)
  // }

  // const handleSuggestionClick = (suggestion) => {
  //   if (activeField === 'pickup') {
  //     setPickup(suggestion)
  //   } else {
  //     setDestination(suggestion)
  //   }
  //   setPanelOpen(false)
  //   setSuggestions([])
  // }

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



  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    console.log(response.data)
    setFare(response.data)
  }


  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(response.data)
  }


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
            <form  onSubmit={(e)=>{
              submitHandler(e)
            }}>
                <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full"></div>
                <input 
                onClick={()=>{
                  setPanelOpen(true)
                  setActiveField('pickup')
                }}
                value={pickup}
                onChange={handlePickupChange}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
                type="text" 
                placeholder='Add a pick-up location'
                />

                <input 
                    onClick={()=>{
                        setPanelOpen(true)
                        setActiveField('destination')
                    }}
                    value={destination}
                    // onChange={(e)=>{
                    //     setDestination(e.target.value)
                    // }}
                    onChange={handleDestinationChange}
                    className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
                    type="text" 
                    placeholder='Enter your destination' />
            </form>

            <button
            onClick={ findTrip}
             className='bg-black text-white px-4 py-2 rounded-lg mt-5 w-full'>
                Find a trip
            </button>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
              <LocationSearchPanel 
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}
              setPickup={setPickup} setDestination={setDestination} activeField={activeField} />
        </div>
      </div>

        <div ref={vehiclePanelRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          { fare && (<VehiclePanel 
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehiclePanel={setVehiclePanel} /> )}
        </div>

        <div ref={confirmRidePanelRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination} 
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRaf} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver 
          createRide={createRide}
          pickup={pickup}
          destination={destination} 
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
        </div>

        <div ref={waitingForDriverRaf} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>
    </div>
  )
}

export default Home
