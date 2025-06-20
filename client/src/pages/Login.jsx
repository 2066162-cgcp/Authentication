import TextField from '@mui/material/TextField';
import logo from '../assets/logo.png';
import { useContext, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { loginApi, registerApi } from '../services/allAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [state, setState] = useState('sign up');
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()

  const{backendUrl,setIsloggedin, getUserData}=useContext(AppContext)


  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const onSubmitHandler =async(e)=>{
    try {
      e.preventDefault();

      if(state==='sign up'){        
        const result=await registerApi(backendUrl,{name,email,password})
        console.log(result);
        if(result.data.success){
          toast.success('registration successfull')
          setIsloggedin(true)
          getUserData()
          console.log(getUserData());
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }else{
          toast.error(result.data.message)
        }
      }else{
        console.log(email,password);
        const result=await loginApi(backendUrl,{email,password})
        console.log(result);
        if(result.data.success){
          toast.success('Login successfull')
          setIsloggedin(true)
          getUserData()
          console.log(getUserData());
          
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }else{
          toast.error(result.data.message)
        }
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div
      className="container-fluid position-relative w-100 align-items-center justify-content-center d-flex" style={{ height: '100vh',background: 'linear-gradient(to right, hsla(229, 32.50%, 69.80%, 0.50),hsl(270, 27.30%, 82.70%))',}}>
      
      <img src={logo} alt="Logo" className="position-absolute img-fluid rounded cursor-pointer top-0 start-0 ms-3 mt-3" style={{ maxWidth: '150px', zIndex: 10 }} onClick={()=>navigate('/')}/>

      <div className="rounded px-3 py-4" style={{ width: '400px', height: 'auto', background: 'linear-gradient(to right, rgba(16, 24, 56, 0.5),rgba(42, 61, 139, 0.5))',}}>
        <div className="d-flex flex-column align-items-center px-4">
          <h2 className='text-light'>{state === 'sign up' ? 'Create Account' : 'Login'}</h2>
          <p className='text-light'>{state === 'sign up' ? 'Create your account' : 'Login to your account!'}</p>
          <form className="d-flex flex-column w-100" onSubmit={(e)=>{onSubmitHandler(e)}}>
            {state==='sign up'&&
            <TextField id="name" label="Full Name" className="my-2 w-100" required type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />}
            <TextField id="email" label="Email" className="my-2 w-100" required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <TextField id="password" label="Password" className="my-2 w-100" required value={password} onChange={(e)=>{setPassword(e.target.value)}}
            type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (//put something at the end of the input field
                  //place elements like buttons or icons inside the input box
                  <InputAdornment position="end"> 
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}//onClick toggles the showPassword state from true to false or vice versa.edge="end" tells it to align at the end of the field.
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <p className='cursor-pointer' onClick={()=>navigate('/reset-password')} style={{textDecoration:'none',color:'indigo'}}>forgot password?</p>
            <button type="submit" className='btn rounded-5 mt-3 text-light' style={{background: 'linear-gradient(to right, #0f1739,rgb(39, 9, 70))'}}>
              {state === 'sign up' ? 'Sign up' : 'Login'}
            </button>
            {
              state==='sign up'?
              <p className='mt-3 text-center' style={{color:'indigo'}} >
              Already have an account? <a className='link-opacity-10-hover cursor-pointer' style={{color:'indigo'}} onClick={()=>{setState('login')}}>Login here</a>
            </p>
            :
            <p className='mt-3 text-center' style={{color:'indigo'}} >
              Does not have account <a className='link-opacity-10-hover cursor-pointer' style={{color:'indigo'}} onClick={()=>{setState('sign up')}}>sign up</a>
            </p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;