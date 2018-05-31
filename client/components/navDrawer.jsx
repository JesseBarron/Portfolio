import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import BackArrow from 'react-icons/lib/fa/arrow-circle-right'
import './styles/navDrawer.scss'

const navDrawer = (props) => {
  return (
    <div className={`navDrawerContainer ${props.showDrawer}`}>
      <div className={`navDrawer`}>
        <div className="navDrawerHead">
            <h2> Menu </h2>
            <div id="arrow">
              <BackArrow size={ 40 } onClick={props.toggleDrawer}/>
            </div>
        </div>
        <div className="linkList">
          <div className="listItem home" onClick={props.toggleDrawer}>
            <NavLink id="navLink" to="/">Home</NavLink>
          </div>
          <div className="listItem blog" onClick={props.toggleDrawer}>
            <NavLink id="navLink" to="/blog">Blog</NavLink>
          </div>
          <div className="listItem about" onClick={props.toggleDrawer}>
            <NavLink id="navLink" to="/about">About</NavLink>
          </div>
          <div className="listItem contact" onClick={props.toggleDrawer}>
            <NavLink id="navLink" to="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
        <div className="backgroundDiv" onClick={props.toggleDrawer}></div>
    </div>
  )
}

export default navDrawer
