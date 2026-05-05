import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        try{
          await handleLogin({ email, password });
          navigate('/');
        } catch (err) {
          alert(err?.data?.message || "Login failed");
        }
    };
    if(loading){
      return (<div>Loading...</div>)
    }

  return (
    <div>
      <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" id="email" placeholder='Enter your email' />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" id="password" placeholder='Enter your password' />
                </div>
                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account? <span style={{ cursor: 'pointer', color: '#e30a3d' }} onClick={() => navigate('/register')} className='link'>Register</span></p>
        </div>
      </main>
    </div>
  )
}

export default Login

