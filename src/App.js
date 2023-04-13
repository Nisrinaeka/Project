import logo from "./logo.svg";
import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Home from "./components/home";
import Update from "./components/update";
import Login from "./components/Login";
import { Menu } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const handleLogout = () => {
    // hapus informasi login dari localStorage dan refresh halaman
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    window.location.reload();
  };

  const [isAuthenticated, setIsAuthenticated] = useState("");
  
  useEffect(()=>{
    // window.location.reload();
		setIsAuthenticated(localStorage.getItem('isAuthenticated'));
	}, [])

  
  // if (isAuthenticated) {

  // }
  return (
    <div className="main">
      <h2 className="main-header">CRUD Data</h2>
      <BrowserRouter>
        <Menu>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          
          {!isAuthenticated ? <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item> : <><Menu.Item as={Link} to="/read">
            Data
          </Menu.Item><Menu.Item as={Link} to="/create">
            Create
          </Menu.Item><Menu.Item onClick={() => handleLogout()}>
            Logout
          </Menu.Item></>}
          
        </Menu>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Read />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update" element={<Update />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
