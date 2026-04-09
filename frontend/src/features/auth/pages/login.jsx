import React from 'react'
import "../auth.form.scss"
import { useNavigate} from 'react-router'

const Login = () => {
    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }

  return (
    <div>
      <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Enter your email' />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter your password' />
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
