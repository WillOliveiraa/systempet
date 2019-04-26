import React from 'react';

import Navbar from './navbar';
import logo from '../../imgs/logo2.png';

export default props => (
    <header className='main-header'>
        <a href='/#/' className='logo'>
            <span className='logo-mini'><b>Sys</b>P</span>
            <span className='logo-lg'>
                {/* <i className='fa fa-money'></i> */}
                <img src={logo} alt='Logo' />
                <b> System</b> Pet
            </span>        
        </a>
        <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
            <Navbar />
        </nav>
    </header>
);
