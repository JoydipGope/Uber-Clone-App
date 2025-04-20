import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      //console.log(userData)
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    }


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
          <form onSubmit={(e)=>{
            submitHandler(e)
          }} className='bg-white p-7 rounded shadow-md'>


            <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
            <div className='flex gap-4 mb-6'>
              <input required
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
               type="text" 
               placeholder='Enter First name' 
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               />

              <input required
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
               type="text"
                placeholder='Enter Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
            
            <input required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             required type="password" placeholder='password' />

            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

          </form>
            <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login hare</Link></p>
        </div>

        <div>
        <p className='text-[10px] leading-tight'>This site is protected by 
            reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
    </div>
  )
}

export default CaptainSignup
