import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props);
  

  // simple array of objects to show the location search panel
  const locations = [
    "University of Information Technology and Sciences (UITS)",
    "Hazrat Shahjalal International Airport",
    "Komolapur Railway Station",
    "ECB Chattar",
    "Jumuna Juture Park",
  ]


  return (
    <div>
      {/* This is the location search panel */}
      {
        locations.map(function(elem, idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium text-lg'>{elem}</h4>
        </div>
        })
      }
      

    </div>
  )
}

export default LocationSearchPanel
