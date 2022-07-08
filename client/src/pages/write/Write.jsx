import './write.css';
import writeImg from '../../images/write.png';
import { useState, useEffect, useContext } from "react";
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';

function Write() {

// ------------loading image---------------------
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  // const [categories, setCategories] = useState("");
  const {user} = useContext(Context);

  // const [catinfo,setCatinfo] = useState([]);
  // const {search} = useLocation(); 

  //  useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get("/categories" + search); //in console 
  //     setCatinfo(res.data)
  //   }
  //   fetchPosts();
  // },[search])


  const getInitialState = () => {
    const categories = "General";
    return categories;
  };

  const [categories, setCategories] = useState(getInitialState);

  const handleChange = (e) => {
    setCategories(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      desc,
      title,
      categories: categories, // update categories in PostSchema
    }

    // const newCat = {
    //   name: categories,
    // }

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch(err) {}
    }

    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {};
  }

 // console.log(categories)
// -------------------------------------------

  return (
    <div className="write">

        {file 
          ? <img src={URL.createObjectURL(file)} className="write-img" alt="" /> 
          : <img src={writeImg} className="write-img" alt="" /> 
        }

        <form className="write-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fileInput"><i className="write-icon fa-solid fa-plus"></i></label>
               
                <input type="file" id="fileInput" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} /> 

                <input type="text" placeholder="Title..." maxLength="40" className="write-input" autoFocus={true} onChange={(e) => setTitle(e.target.value)} />

               {/* <input type="text" placeholder="Category..." className="write-input" autoFocus={true} onChange={(e) => setCategories(e.target.value)} /> */}
           
              <select className="cat-selection" value={categories} onChange={handleChange} >
                  <option value="General">General</option>
                  <option value="Programming">Programming</option>
                  <option value="Art & 3D">Art & 3D</option>
                  <option value="Narrative Design">Narrative Design</option>
                  <option value="World Building">World Building</option>
                  <option value="Music & Sound">Music & Sound</option>
                  <option value="Literature">Literature</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Games">Games</option> 
              </select>

            </div>

            <div className="form-group">
                <textarea placeholder="Tell your story..." type="text" className="write-input write-text"  onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
            <button className="write-submit" type="submit">Publish</button>
        </form>
    </div>
  )
}

export default Write