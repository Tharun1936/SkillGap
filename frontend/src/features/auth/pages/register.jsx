import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate();
    const { loading , handleRegister } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlesubmit = async (e) => {
        e.preventDefault();
        try{
          await handleRegister({ username, email, password });
          navigate('/login');
        } catch(err) {
          alert(err?.data?.message || "Registration failed");
        }
        if(loading){
          return <div>Loading...</div>
        }
    }

  return (
    <div>
      <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handlesubmit}>
                <div className='input-group'>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="username" placeholder='Enter your username' />
                </div>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" placeholder='Enter your email' />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" placeholder='Enter your password' />
                </div>
                <button className='button primary-button'>Register</button>
            </form>
            <p>Already have an account? <span style={{ cursor: 'pointer', color: '#e30a3d' }} onClick={() => navigate('/login')} className='link'>Login</span></p>
        </div>
      </main>
    </div>
  )
}

export default Register
