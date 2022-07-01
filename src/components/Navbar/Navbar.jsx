import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements.jsx';

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/184/184671.png"
          height="40"
          width="40"
          alt="logo"
        />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/" activeStyle>
          Home
        </NavLink>
        <NavLink to="/search" activeStyle>
          Search
        </NavLink>
      </NavMenu>
      <NavBtn>
        <div>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </div>
      </NavBtn>
    </Nav>
  );
}
