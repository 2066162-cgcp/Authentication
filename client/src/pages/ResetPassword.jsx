import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { resetUserPasswordApi, sendResetPwdOtpApi } from '../services/allAPI';

function ResetPassword() {

  const navigate=useNavigate()
  const inputRef=React.useRef([])
  const{backendUrl, getUserData, isLoggedin, userData}=useContext(AppContext)

  const [email,setEmail]=useState('')
  const [newPassword,setNewpassword]=useState('')

  const[emailSent,setEmailSent]=useState('')
  const[otp,setOtp]=useState(0)
  const[isOtpSubmitted,setIsOtpSubmitted]=useState(false)
  
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

    const handleResetPwdEmail= async(e)=>{
      e.preventDefault()
      try {
        const{data}= await sendResetPwdOtpApi(backendUrl,{email})
        if(data.success){
          toast.success('Reset Password OTP sent successfully')
          setEmailSent(true)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const submitOtp=async(e)=>{
      e.preventDefault()
      const otpArray=inputRef.current.map(e=>e.value)
      console.log(inputRef.current);
      console.log(otpArray.join(''));
      setOtp(otpArray.join(''))
      setIsOtpSubmitted(true)

      toast.success('otp submitted succcfully. Please reset the password')
    }

    const resetPassword=async(e)=>{
      try {
        e.preventDefault()
        console.log({ email, otp, newPassword });
        const reqBody={email,otp,newPassword}
        const{data}=await resetUserPasswordApi(backendUrl,reqBody)
        console.log({data});
        if(data.success){
          toast.success(data.message)
          navigate('/login')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error)
      }
    }

  useEffect(()=>{

  },[])
  return (
    <div className="container-fluid position-relative w-100 align-items-center justify-content-center d-flex" style={{ height: '100vh',background: 'linear-gradient(to right, hsla(229, 32.50%, 69.80%, 0.50),hsl(270, 27.30%, 82.70%))',}}>
      <img src={logo} alt="Logo" className="position-absolute img-fluid rounded cursor-pointer top-0 start-0 ms-3 mt-3 logo-img" style={{ maxWidth: '150px', zIndex: 10 }} onClick={()=>navigate('/')}/>

      { !emailSent &&
        <div className="rounded px-3 py-4 d-flex flex-column align-items-center px-4" style={{ width:'400px', height: 'auto', background: 'linear-gradient(to right, rgba(16, 24, 56, 0.5),rgba(42, 61, 139, 0.5))',}}>
          <form className="d-flex flex-column align-items-center my-2 w-100" onSubmit={handleResetPwdEmail}>
            <h3 className='text-light'>Reset Password</h3>
            <TextField id="email" label="Email id" value={email} className="my-2 w-100" required  onChange={(e)=>setEmail(e.target.value)}/>
            <button type="submit" className='form-control w-75 btn rounded-5 mt-3 text-light' style={{background: 'linear-gradient(to right, #0f1739,rgb(39, 9, 70))'}}>Submit</button>
          </form>
      </div>
      }

      {!otp && emailSent &&
        <div className="rounded px-3 py-4 d-flex flex-column align-items-center px-4" style={{ width: 'auto', maxWidth:'800px', height: 'auto', background: 'linear-gradient(to right, rgba(16, 24, 56, 0.5),rgba(42, 61, 139, 0.5))',}}>
        <form className="d-flex flex-column align-items-center my-2" onSubmit={submitOtp}>
            <h2 className='text-light'>Reset Password OTP</h2>
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
      }

      {isOtpSubmitted &&
        <div className="rounded px-3 py-4 d-flex flex-column align-items-center px-4" style={{ width:'400px', height: 'auto', background: 'linear-gradient(to right, rgba(16, 24, 56, 0.5),rgba(42, 61, 139, 0.5))',}}>
          <form className="d-flex flex-column align-items-center my-2 w-100" onSubmit={resetPassword}>
            <h3 className='text-light'>New Password</h3>
            <TextField id="password" label="password" value={newPassword} className="my-2 w-100" required  onChange={(e)=>setNewpassword(e.target.value)}/>
            <button type="submit" className='form-control w-75 btn rounded-5 mt-3 text-light' style={{background: 'linear-gradient(to right, #0f1739,rgb(39, 9, 70))'}}>reset</button>
          </form>
      </div>}
    </div>
  )
}

export default ResetPassword