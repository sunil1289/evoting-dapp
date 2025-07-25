import React, { useState, useEffect } from 'react';
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';

import { FaCaretDown } from 'react-icons/fa';
import vote from '../../components/Homepage/images/vote.png';

import axios from 'axios';

const Navbar = () => {
  const [options, setOptions] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const email = sessionStorage.getItem('email');
    if (!email) return;

    try {
      const response = await axios.post('http://localhost:4000/api/user/email', {
        email,
      });
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const optionsHandler = () => setOptions((prev) => !prev);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="logo text-white mx-5">
        <img
                  src={vote}
                  alt="E-Voting Logo"
                  style={{ height: "40px", marginRight: "20px" }}
                />
        <span className="nav-title mx-1">Decentralized E-Voting</span>
      </div>
      <div className="navbar-brand text-white">
        <div className="btn btn-dark text-white d-flex" onClick={optionsHandler}>
          <img
            src={userData.pictureURL}
            className="dp-image"
            alt="User profile"
          />
          <span className="user-name py-2">
            {userData?.name} <FaCaretDown />
          </span>
          {options && (
            <div className="options-admin">
              <div className="option">
    
              </div>
              <div className="option">
                <Link className="option-link" to="/">
                  <span className="d-block">Logout</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
