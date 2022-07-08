import './login.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useRef, useContext } from "react";
import { axiosInstance } from '../../config';
 
const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE"});
    }
  };

  // console.log(user);
  // console.log(isFetching);

  return (
    <div className="login">
        <span className="login-title">Login</span>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username..." className='login-input' ref={userRef} />
            <label>Password</label>
            <input type="password" placeholder="Password..." className='login-input' ref={passwordRef} />
            <button className="login-btn" type="submit" disabled={isFetching}>Login</button>
        </form>
            <button className="register-btn">
            <Link className="link" to="/register">Register</Link>
           </button>
    </div>
  )
}

export default Login