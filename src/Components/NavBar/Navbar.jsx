import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Vivacommerce</a>
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to='/'>
            <a  className="nav-links">Shop All</a>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to='/sports'>
              <a  className="nav-links">Sports</a>
            </Link>   
          </li>

          <li className="nav-item">
            <Link to='/outdoors'>
              <a className="nav-links">Outdoors</a>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a href="/contact" className="nav-links">Contact</a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
