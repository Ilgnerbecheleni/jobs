import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import image from '../../assets/job-login.svg';
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../contexts/google/authGoogle';

function Login() {


  const {signingoogle, signed}= useContext(AuthGoogleContext);
  async function signIn(){
    await signingoogle();
  }
console.log(signed)


  if(!signed){
    return (
    <>
    <h1>Login</h1>

    <main className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="card text-center border border-dark rounded p-3 " style={{ width: '400px' }}>
        <img src={image} className="card-img-top mx-auto d-block" alt="job" style={{ width: '300px' }} />
        <div className="card-body">
          <h5 className="card-title">Login com Google</h5>
          <button className='btn btn-danger' onClick={signIn}><FaGoogle className="me-2" />Entre com sua conta Google</button>
        </div>
      </div>
    </main>
    </>
    )
    }else{
      return <Navigate to={'/'}/>
    }
    
  


}

export default Login;
