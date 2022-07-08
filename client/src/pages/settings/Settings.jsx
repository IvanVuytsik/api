import Sidebar from '../../components/sidebar/Sidebar';
import './settings.css';
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from '../../config';
 

function Settings() {
    const { user, dispatch } = useContext(Context);

    const publicFolder = "https://blog-tsq.herokuapp.com/images/";;

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email, 
            password,
        }

        if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
            await axiosInstance.post("/upload", data);
        } catch(err) {}
        }
        try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" })
        };
    }
        // -------------------------------------------

  return (
    <div className="settings">
        <div className="settings-wrapper">
            <div className="settings-title">
                <span className="update-title">Update Account</span>
                <span className="delete-title">Delete Account</span>
            </div>
            <form action="" className="settings-form" onSubmit={handleSubmit}>
                <label> Profile Image </label>
                <div className="settings-profile">
                    <img src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic} alt="" />
                    <label htmlFor="fileInput"><i className="profile-icon fa-solid fa-user"></i></label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                <button className="settings-submit" type="submit">Update</button>
                { success && <span className="update-status">User updated succesfully!</span>}
            </form>
        </div>
        <Sidebar />
    </div>
  );
}

export default Settings