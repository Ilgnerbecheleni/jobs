import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import image from '../../assets/autonomo.jpg';

function Login() {
  return (
    <main className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="card text-center border border-dark rounded p-3 " style={{ width: '400px' }}>
        <img src={image} className="card-img-top mx-auto d-block" alt="job" style={{ width: '300px' }} />
        <div className="card-body">
          <h5 className="card-title">Login com Google</h5>
          <button className='btn btn-danger'><FaGoogle className="me-2" />Entre com sua conta Google</button>
        </div>
      </div>
    </main>
  );
}

export default Login;
