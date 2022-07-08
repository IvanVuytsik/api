import './home.css';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import { axiosInstance } from '../../config';


const Home = () => {

//fetch data rom DB using axios---------------
  const [posts,setPosts] = useState([]);
  const {search} = useLocation(); //search is from data 

  //console.log(location)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search); //in console 
      setPosts(res.data)
      // console.log(res);
    }
    fetchPosts();
  },[search])
//--------------------------------------------

  return (
  <>
    <Header />
    <div className="home">
        <Posts posts={posts} />
        <Sidebar />
    </div>
  </>
  )
}

export default Home