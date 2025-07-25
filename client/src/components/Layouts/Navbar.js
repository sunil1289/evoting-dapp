import React, { useState, useEffect } from 'react';
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';
import vote from '../Homepage/images/vote.png';
import { FaCaretDown } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [options, setOptions] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/email', {
        email: sessionStorage.getItem('email'),
      });
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="logo text-white mx-5">
        <div className="nav-logo">
           <img
                  src={vote}
                  alt="E-Voting Logo"
                  style={{ height: "40px", marginRight: "20px" }}
                />
          <span className="nav-title mx-1">Decentralized E-Voting</span>
        </div>
      </div>
      <div className="navbar-brand text-white">
        <div className="btn btn-dark text-white d-flex align-items-center" onClick={optionsHandler}>
          <img
            src={userData.pictureURL || 'default-profile.jpg'}
            className="dp-image"
            alt="User profile"
          />
          <span className="user-name py-2">
            {userData.name || 'User'} <FaCaretDown />
          </span>
        </div>
        {options && (
          <div className="options">
            <div className="option">
              <Link className="option-link" to="/comingsoon">
                <span className="d-block">Help</span>
              </Link>
            </div>
            <div className="option">
              <Link className="option-link" to="/">
                <span className="d-block">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;