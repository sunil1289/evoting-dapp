import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from './HomeNavElements';
import { FaBars } from 'react-icons/fa';
import vote from '../images/vote.png';
const HomeNav = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  // Toggle nav background on scroll
  const changeNav = () => {
    setScrollNav(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => window.removeEventListener('scroll', changeNav);
  }, []);

  return (
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <NavLogo to="/">
          <img 
            src={vote} 
            alt="E-Voting Logo" 
             style={{ height: '40px', marginRight: '20px' }} 
          />
        Decentralized E-Voting
        </NavLogo>

        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>

        <NavMenu>
          {['about', 'discover', 'features', 'signup'].map((item) => (
            <NavItem key={item}>
              <NavLinks
                to={item}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLinks>
            </NavItem>
          ))}
        </NavMenu>

        <NavBtn>
          <NavBtnLink to="/login">Log In</NavBtnLink>
          <NavBtnLink to="/adminlogin" style={{ marginLeft: '30px' }}>Admin</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
};

export default HomeNav;
