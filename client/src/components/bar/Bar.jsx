import './bar.css'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";

 
  
function Bar() {
    const {user, dispatch} = useContext(Context);
    const publicFolder = "https://blog-tsq.herokuapp.com/images/";

    const handleLogout = () => {
            dispatch({ type: "LOGOUT" });
    }

  return (
    <div className='topbar'> 
        <div className="topleft">
            <a href="https://www.youtube.com/channel/UCwNV-AEok2W6LEan95xZicQ" target="_blank"><i className="icon fa-brands fa-youtube"></i></a>
            <a href="https://www.linkedin.com/in/ivan-vuytsik-82708471/" target="_blank"><i className="icon fa-brands fa-linkedin"></i></a>
            {/* <i className="icon fa-brands fa-twitter"></i> */}
            {/* <i className="icon fa-brands fa-instagram"></i> */}
        </div>
        <div className="topcenter">
            <ul className='toplist'>
                <li className="list-item"><Link className="link" to="/">HOME</Link></li>
                {/* <li className="list-item"><Link className="link" to="/about">ABOUT</Link></li>
                <li className="list-item"><Link className="link" to="/contact">CONTACT</Link></li> */}
                <li className="list-item"><Link className="link" to="/write">WRITE</Link></li>
                <li className="list-item" onClick={handleLogout}><Link className="link" to="/logout"> {user && "LOGOUT"} </Link></li>
            </ul>

        </div>
        <div className="topright">
            
            {user ? (
                <Link to="/settings"> 
                    <img className="avatar" src={publicFolder + user.profilePic} alt="" /> 
                </Link> ) : (
                    <ul className='toplist'>
                        <li className="list-item"><Link className="link" to="/login">LOGIN</Link></li>
                        <li className="list-item"><Link className="link" to="/register">REGISTER</Link></li>
                    </ul>
            )}

            <i className="search-icon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Bar