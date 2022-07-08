import './singlepost.css';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';

const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2]; //getting id at index 2
    const [post, setPost] = useState({})

    const publicFolder = "https://blog-tsq.herokuapp.com/images/";
 
    const {user} = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
       const getPost = async () => {
        const res = await axiosInstance.get("/posts/" + path)
        //console.log(res)
        setPost(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)

        };
        getPost()
    }, [path]);

    // -------------------------------deleting posts-------------------------------
    const handleDelete = async () => {
        try {
            await axiosInstance.delete("/posts/" + path, {data: {username: user.username}});
            window.location.replace("/");
        } catch(err) {}
    };

    // --------------------------------updating posts-------------------------------
    const handleUpdate = async () => {
        try {
            await axiosInstance.put("/posts/" + path, {username: user.username, title, desc});
            // window.location.reload();
            setUpdate(false);
        } catch(err) {}
    };
    //------------------------------------------------------------------------------

  return (
    <div className="single-post">
        <div className="wrapper">
            {post.photo && (<img src={publicFolder + post.photo} alt="" className="single-img" />
            )}

            {
                update ? <input type="text" value={title} className="single-post-title-input" autoFocus onChange={(e) => setTitle(e.target.value)} /> : (
           
                <h1 className="single-post-title">
                    {title}
                    {post.username === user?.username && (
                        <div className="edit-container">
                            <i className="edit-icon fa-solid fa-pen-to-square" onClick={()=>setUpdate(true)} ></i>
                            <i className="edit-icon fa-solid fa-eraser" onClick={handleDelete}></i>
                        </div>
                    )}
                </h1>
            )};

            <div className="single-post-info">
                <span className="single-post-author">Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link></span>
                <span className="single-post-date">{new Date(post.createdAt).toDateString()}</span>
            </div>

            {
                update ? <textarea  className="single-post-desc-input" value={desc} onChange={(e) => setDesc(e.target.value)} /> : (
                <p className="single-post-desc">
                    {desc}
                </p>
            )};

            {
            update &&
                <button className="single-post-btn" onClick={handleUpdate}>Update</button>
            };

        </div>
    </div>
  )
}

export default SinglePost