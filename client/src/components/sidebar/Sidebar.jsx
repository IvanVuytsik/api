import './sidebar.css';
import about from '../../images/about.png';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from '../../config';

const Sidebar = () => {
    const [cats,setCats]  = useState([]);

    useEffect(()=> {
        const getCats = async() => {
            const res = await axiosInstance.get("/categories")
            setCats(res.data)
        }
        getCats();
    }, []);

  return (
    <div className="sidebar">
        <div className="sidebar-item">
            <span className="sidebar-title">About Me</span>
            <img className="sidebar-img" src={about} alt="" />
            <p className="sidebar-text">This is my blog dedicated to development of digital products such as games, interactive presentations, web applications and videos. </p>
        </div>
        <div className="sidebar-item">
            <span className="sidebar-title">Categories</span>
            <ul className="sidebar-list">
                {cats.map((c, index)=> (
                    <Link to={`/?cat=${c.name}`} className="link" key={index}>
                        <li className="sidebar-list-item">{c.name}</li>
                    </Link>
                ))}
            </ul>
        </div>

        <div className="sidebar-item">
            <span className="sidebar-title">Follow Me</span>
            <div className="sidebar-social">
                <a href="https://www.youtube.com/channel/UCwNV-AEok2W6LEan95xZicQ" target="_blank"><i className="icon fa-brands fa-youtube"></i></a>
                <a href="https://www.linkedin.com/in/ivan-vuytsik-82708471/" target="_blank"><i className="icon fa-brands fa-linkedin"></i></a>
                {/* <i className="icon fa-brands fa-twitter"></i> */}
                {/* <i className="icon fa-brands fa-instagram"></i> */}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
 