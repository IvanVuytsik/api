import './register.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '../../config';

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstance.post("/auth/register", {username, email, password});
      res.data && window.location.replace("/login"); //relocates to login page
  } catch(err){
    setError(true);
    //console.log(err)
  }
  };

  return (
    <div className="register">
        <span className="register-title">Register</span>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username..." className='register-input' onChange={(e) => setUsername(e.target.value)} />
            <label>Email</label>
            <input type="text" placeholder="Enter your email..." className='register-input' onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder="Password..." className='register-input' onChange={(e) => setPassword(e.target.value)} />
            <button className="regregister-btn" type="submit">Register</button>
        </form>
            <button className="reglogin-btn">
            <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span className='error-alert'>Something went wrong!</span>}
    </div>
  )
}

export default Register