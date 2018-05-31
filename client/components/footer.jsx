import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles/footerStyle.scss'
import SocialBttns from './socialbttns.jsx'

const Footer = (props) => {
  return(
    <div className="footerContainer">
      <div className="links">
        <div className="navList">
          <div className="label">
            <header>Links</header>
          </div>
          <ul className="linkList">
            <li className="navItem">
              <Link to='/'>Home</Link>
            </li>
            <li className="navItem">
              <Link to="/about">About</Link>
            </li>
            <li className="navItem">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="navItem">
              <Link to="Contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="socials">
        <SocialBttns />
      </div>
    </div>
  )
}

export default Footer