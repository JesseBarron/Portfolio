import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../store'

const NavBar = (props) => {
    const { isLoggedIn } = props
    return (
        <div>
            <NavLink to='/'> Home </NavLink>
            <NavLink to='/blog'> blog </NavLink>
            {
                !isLoggedIn 
                    ?   <React.Fragment>
                            <NavLink to='/login'> login </NavLink>
                            <NavLink to='/signup'> signup </NavLink>
                        </React.Fragment>
                    :   <button onClick={props.logout}>LogOut</button>
            }

        </div>
    )
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