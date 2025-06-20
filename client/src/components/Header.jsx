import { useContext } from "react";
import { AppContext } from "../context/AppContext";


function Header() {
    const {userData}=useContext(AppContext)
    console.log(userData);
    
  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: '100%', height: '100vh' }}>
        <img src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740" alt="AI Robot" style={{ width: '150px', height: '150px' }} />
        <h2 className='d-flex gap-2'>
            Hey {userData? userData.name : 'Developer'}
            <span role="img" aria-label="wave">👋</span>
        </h2>
        <h1>
            <b>
                Welocome to our app
            </b>
        </h1>
        <p className="mx-3 mx-sm-5" style={{textAlign:'justify'}}>Let's start with a quickproduct tour and we will have you up and running in no time!</p>
        <button type="button" className='btn btn-success rounded-5 px-5 py-2 mt-3'>Get Started</button>
    </div>
  )
}

export default Header;