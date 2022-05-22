import React, { useContext, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { BsCode, BsCodeSlash} from "react-icons/bs";
import Button2 from "./Button2";
import "./Button2.css";
import "./Navbar.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import {UserContext} from '../util/context';
import { Button, Nav} from 'react-bootstrap';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate(); 
  const {setAuthorization} = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const onClick = async (e) => {
    navigate('/');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (e.target.value === 'logout') {
      setAuthorization('');
      window.localStorage.clear();
      alert("Account has signed out!");
      navigate('/');
    }
  };

  const username = JSON.parse(window.localStorage.getItem('username'));

  return (

    <div className ="coverBackGround">
    <nav className="navbar container">
      
      <div className="logo">
        <BsCode color="#fff" size={33} />
        
        <p className="logo-text" onClick={onClick}>
          Bud<span>Code</span>
        </p>
        
        <BsCodeSlash color="#fff" size={33} />
      </div>
      {localStorage.getItem('username') ?
      <>
      <menu>
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          {/* <li>
            <a href="/">Home</a>          
          </li> */}
          <li> 
           <a href="/feed">Feed</a>
          </li>
          <li>
            <a href="/projects/create">Create</a>
          </li>
          <li>
            <a href="/projects/search">Search</a>
          </li>
          <li>
            <a href={`/users/${username}`}>Profile</a>
          </li>
         
          <li>
            <a href={`/notification/${username}`}>Notifications</a>
          </li>
          <li className="nav-btn">
            <Button variant="outline-info" value= 'logout'  type="submit" onClick={handleClick}>
                           Logout
                        </Button> 
          </li>
        </ul>
      </menu>
      </>
      :
      <>
       <menu>
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          <li>
            <a href="/">Home</a>
          </li>
          <li>
          <a href="#features">Features</a>
          </li>
          <li>
          <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="/projects/search">Search</a>
          </li>
          <li className="nav-btn">
            <Button2 text={"Sign Up"} btnClass={"btn-dark2"} href={"/auth/signup"} />
            <Button2 text={"Sign In"} btnClass={"btn-dark2"} href={"/auth/signin"} />
          </li>
        </ul>
      </menu>
      
      </>
      }
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#fff" size={30} />
        ) : (
          <AiOutlineBars color="#fff" size={27} />
        )}
      </div>
     
    </nav>
    </div>
    
  );
};

export default Navbar;
