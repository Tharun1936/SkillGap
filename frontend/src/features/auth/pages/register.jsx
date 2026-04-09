import React from 'react'
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }

  return (
    <div>
      <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handlesubmit}>
                <div className='input-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder='Enter your username' />
                </div>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Enter your email' />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter your password' />
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
