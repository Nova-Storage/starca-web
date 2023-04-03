import './Footer.css';
import React from 'react';
import Register from './Register';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//TODO: Get register to link to registration page
function Footer() {
    return (
        <div className='footer-container'>
            <Router>
            <div>
                <h2 className='footer-link-headers'>Rent your place or free up space </h2>
                <p className='footer-link-headers' style={{'margin-top': '8px'}}>Hassle free listing/rent management</p>
                <Link to='/register' className='footer-register-link'>Register now!</Link>
            </div>
            <div className='grid-footer-link-sections'>
                <div className='footer-links'>
                    <h4 className='footer-link-headers'>About Us</h4>
                    <Link to='/'>The Team</Link>
                    <Link to='/'>Mission</Link>
                    <Link to='/'>Our history</Link>
                    <Link to='/'>Investors</Link>
                </div>
                <div className='footer-links'>
                    <h4 className='footer-link-headers'>Contact Us</h4>
                    <Link to='/'>Email</Link>
                    <Link to='/'>Phone</Link>
                    <Link to='/'>Fax</Link>
                </div>
                <div className='footer-links'>
                    <h4 className='footer-link-headers'>Legal</h4>
                    <Link to='/'>Terms of Service</Link>
                    <Link to='/'>Privacy Policy</Link>
                    <Link to='/'>Cookies</Link>
                </div>
                <div className='footer-links'>
                    <h4 className='footer-link-headers'>Social Media</h4>
                    <Link to='/'>Instagram</Link>
                    <Link to='/'>Facebook</Link>
                    <Link to='/'>Twitter</Link>
                    <Link to='/'>YouTube</Link>
                </div>
            </div>
            
            </Router>
        </div>
    )
}

export default Footer;