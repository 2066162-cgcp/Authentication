import React, { useContext, useEffect } from 'react';
import logo from '../assets/logo.png';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { VerifyEmailOtpApi } from '../services/allAPI';
import { toast } from 'react-toastify';

function EmailVerify() {

  const inputRef=React.useRef([])
  const navigate=useNavigate()
  const{backendUrl, getUserData, isLoggedin, userData}=useContext(AppContext)

  const handleInput=(e,index)=>{
    // This creates a ref that stores references to each of the 6 input elements. inputRef.current will be an array like:
    // [input0, input1, input2, input3, input4, input5]
    // This lets you programmatically control the inputs (e.g., set focus).
    if(e.target.value.length>0 && index<inputRef.current.length-1){
      inputRef.current[index+1].focus()
    }
  }

  const handleDeleteInput=(e, index)=>{
    if(e.key==='Backspace' && index>0 && e.target.value==''){
      inputRef.current[index-1].focus()
    }
  }

  const handlePaste=(e)=>{
    const paste=e.clipboardData.getData('text')
    const pasteArray=paste.split('')

    pasteArray.forEach((char,index)=>{
      inputRef.current[index].value=char
    })
  }

  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();

      const otpArray=inputRef.current.map(e=>e.value)
      const otp=otpArray.join('')

      const {data}=await VerifyEmailOtpApi(backendUrl,{otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])
  return (
    <div className="container-fluid position-relative w-100 align-items-center justify-content-center d-flex" style={{ height: '100vh',background: 'linear-gradient(to right, hsla(229, 32.50%, 69.80%, 0.50),hsl(270, 27.30%, 82.70%))',}}>
        <img src={logo} alt="Logo" className="position-absolute img-fluid rounded cursor-pointer top-0 start-0 ms-3 mt-3" style={{ maxWidth: '150px', zIndex: 10 }} onClick={()=>navigate('/')}/>

        <div className="rounded px-5 py-4" style={{ maxWidth: '600px', height: 'auto', background: 'linear-gradient(to right, rgba(16, 24, 56, 0.5),rgba(42, 61, 139, 0.5))',}}>
        <form className="d-flex flex-column align-items-center my-2" onSubmit={handleSubmit}>
          <h2 className='text-light'>Email Verify OTP</h2>
          <p className='text-light'>Enter 6-digit code sent to your mail id</p>
          <div className="d-flex justify-content-center flex-wrap gap-2 my-3" onPaste={handlePaste}>
            {
              Array(6).fill(0).map((_,index)=>(
                <input type="text" key={index} className='form-control text-center rounded ' maxLength={1} style={{maxWidth:'50px'}} required
                ref={e=>inputRef.current[index]=e} //Stores each input element in inputRef.current
                onKeyDown={(e)=>handleDeleteInput(e,index)}
                onInput={(e)=>handleInput(e,index)}
                />
              ))
            }
          </div>
          <button type="submit" className='form-control w-75 btn rounded-5 mt-3 text-light' style={{background: 'linear-gradient(to right, #0f1739,rgb(39, 9, 70))'}}>
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify