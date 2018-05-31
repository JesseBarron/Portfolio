import './styles/navbarStyles.scss'
import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Menu from 'react-icons/lib/md/menu'

import NavDrawer from './navDrawer.jsx'
import {logout} from '../store'

const NavBar = (props) => {
  const {isLoggedIn, toggleDrawer} = props
  return (<div className="container">
    <div className="navbarContainer">
      <div className="navItem">
        <NavLink className="navLink home" to='/'>Home</NavLink>
        <hr/>
      </div>
      <div className="navItem">
        <NavLink className="navLink about" to='/about'>
          About
        </NavLink>
        <hr/>
      </div>
      <div className="logoContainer">
        <NavLink className="navLink navLogo" to='/'>
          <img className="logo" src="/assets/Dstag.jpg"/>
        </NavLink>
        <hr/>
      </div>
      <div className="navItem">
        <NavLink className="navLink blog" to='/blog'>
          Blog
        </NavLink>
        <hr/>
      </div>
      <div className="navItem">
        <NavLink className="navLink contact" to='/contact'>
          Contact
        </NavLink>
        <hr/>
      </div>
    </div>
    {
      !isLoggedIn
        ? <div className="authButtonContainer">
            <div>
              <NavLink to='/login'>
                login
              </NavLink>
              <NavLink to='/signup'>
                signup
              </NavLink>
            </div>
            <div id="menuBttn">
              <Menu size={50} onClick={toggleDrawer} id="openDrawer"/>
            </div>
          </div>
        : <div className="authButtonContainer">
            <button onClick={props.logout}>LogOut</button>
            <div id="menuBttn">
              <Menu size={50} onClick={toggleDrawer} id="openDrawer"/>
            </div>
          </div>
    }
    <NavDrawer showDrawer={props.showDrawer} toggleDrawer={toggleDrawer}/>
  </div>)
}
const mapState = state => ({
  isLoggedIn: !!state.User.id
})

const mapDispatch = (dispatch, ownProps) => ({
  logout(e) {
    dispatch(logout())
    ownProps.history.push('/')
  }
})
export default withRouter(connect(mapState, mapDispatch)(NavBar))
