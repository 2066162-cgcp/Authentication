import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';
import react from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar=()=> {
  const navigate=useNavigate();
  return (
    <div className='d-flex w-100 justify-content-between align-items-center px-5 top-0' style={{position:'absolute'}}>
        <img src={logo} alt="Logo" className='img-fluid rounded' style={{ maxWidth: '150px'}}/>

        <button type="button" className='d-flex align-items-center rounded-5 btn btn-light' onClick={()=>{navigate('/login')}}>
            login
            <FontAwesomeIcon className='ms-2' icon={faArrowRight} />
        </button>
    </div>
  )
}

export default Navbar