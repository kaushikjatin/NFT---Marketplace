import React, { useState} from 'react';

import { Link } from 'react-router-dom';
import './NavBar.styles.css';




function Navbar() {
  const [click, setClick] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  



  return (
    <>
      <nav className='navbar'>
      
      <img
              className='cards__item__img'
              alt='Innovation Garage'
              src={require("./fidelity.jpeg")}
              width="178"
              height= "56"
              padding= "10"
            />
        
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <i className='fab fa-typo3' />

          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/all_tokens'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                All Tokens
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Your_tokens'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Your Tokens
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/upload'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Upload Assets
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Your Profile
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;