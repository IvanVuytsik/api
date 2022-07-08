import Bar from "./components/bar/Bar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Single from './pages/single/Single';
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
      <Bar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="register" element={user ? <Home /> : <Register />} />
        <Route path="login" element={user ? <Home /> : <Login />} />
        <Route path="write" element={user ? <Write /> : <Register />} />
        <Route path="settings" element={user ? <Settings /> : <Register />} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />}  /> */}
        <Route path="post/:postid" element={<Single />} />
      </Routes>

    </Router>
  );
}

export default App;
