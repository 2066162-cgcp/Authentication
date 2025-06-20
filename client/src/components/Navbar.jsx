import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { logoutApi, sendVerificationOtpApi } from '../services/allAPI';
import { toast } from 'react-toastify';


function Navbar() {
  const navigate=useNavigate();
  const{setIsloggedin,userData,setUserData,backendUrl}=useContext(AppContext);
  
  const logout = async () => {
    try {
      const { data } = await logoutApi(backendUrl);
      data.success && setIsloggedin(false);
      data.success && setUserData(false);
      toast.success("Logged out successfully");
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    }
  };

  const sendVerificationOtp=async()=>{
    try {
      const {data}=await sendVerificationOtpApi(backendUrl)
      if(data.success){
        toast.success('Otp send to user to verify email')
        setTimeout(() => {
          navigate('/verify-email')
        }, 3000);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='d-flex w-100 justify-content-between align-items-center px-5 top-0' style={{position:'absolute'}}>
        <img src={logo} alt="Logo" className='img-fluid rounded' style={{ maxWidth: '150px'}}/>

        {userData?
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-split-basic">
              {userData.name[0].toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!userData.isAccountVerified &&
                <Dropdown.Item className='cursor-pointer' onClick={sendVerificationOtp}>Verify Mail</Dropdown.Item>
              }
              <Dropdown.Item className='cursor-pointer' onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <button type="button" className='d-flex align-items-center rounded-5 btn btn-light' onClick={()=>{navigate('/login')}}>
            login
            <FontAwesomeIcon className='ms-2' icon={faArrowRight} />
        </button>}
    </div>
  )
}

export default Navbar