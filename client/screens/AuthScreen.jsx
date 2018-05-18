import React, { Component } from 'react'

import { ErrorDisplay } from '../components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { authUser } from '../store'


import './styles/_AuthScreen.scss'

class AuthScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPW: '',
            submitDisabled: true,
            buttonClass: 'disabled',
            error: ''
        }
    }

    handleInputChange = (name, e) => {
        this.setState({ [name]: e.target.value }, () => {
            if(this.props.type == 'signup') {
                this.validateSignup()
                if(this.props == 'signup' && name == 'confirmPW') {
                    this.checkPW()
                }
            } else {
                this.validateLogin()
            }
        })
    }

    validateLogin = () => {
        const { email, password } = this.state
        if(email && password) {
            this.setState({ submitDisabled: false, buttonClass: 'enabled' })
            return true
        } else {
            this.setState({ submitDisabled: true })
            return false
        }
    }

    validateSignup = () => {
        const { email, name, password, confirmPW } = this.state
        if(email && name && password && confirmPW && this.checkPW()) {
            this.setState({ submitDisabled: false, buttonClass: 'enabled' })
            return true
        } else {
            this.setState({ submitDisabled: true})
            return false
        }
    }

    checkPW = () => {
        return this.state.password === this.state.confirmPW
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if(this.validateSignup() || this.validateLogin()) {
            const { confirmPW, submitDisabled, ...newUser } = this.state
            const { type } = this.props
            const isAuthorized = await this.props.authUser(type, newUser)
            if(isAuthorized.success) {
                this.props.history.push('/')
            } else {
                this.setState({ error: isAuthorized.message })
            }
        }
    }

    render() {
        const { email, name, password, submitDisabled, confirmPW, error, buttonClass } = this.state
        const { type } = this.props
        return (
            <div className="authFormScreenContainer">
                <div className="authFormContainer">
                    <div className="formHeader">
                        <h1>{type.toUpperCase()}</h1>
                        <ErrorDisplay error={error}/>
                    </div>
                    <form className="contact-form" onSubmit={this.handleSubmit}>
                        {
                            type == 'signup' &&
                            <div className="input-container">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => this.handleInputChange('name', e)}
                                    className="input name"
                                />
                            </div>
                        }
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => this.handleInputChange('email', e)}
                                className="input email"
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => this.handleInputChange('password', e)}
                                className="input password"
                            />
                        </div>
                        {
                            type == 'signup' &&
                            <div className="input-container">
                                <label>Confirm password</label>
                                <input
                                    type="password"
                                    value={confirmPW}
                                    onChange={(e) => this.handleInputChange('confirmPW', e)}
                                    className="input confirmPW"
                                />
                            </div>
                        }
                        <button className={`submit-bttn ${buttonClass}`} type="submit" disabled={submitDisabled}>{type}</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateLogin = (state) => ({
    user: state.user,
    type: 'login'
})
const mapStateSignup = (state) => ({
    user: state.user,
    type: 'signup'
})

const mapDispatch = (dispatch, props) => ({
    async authUser(type, data) {
        const { history } = props 
        data.email = data.email.toLowerCase()
        data.name = data.name.toLowerCase()
        return dispatch(authUser(type, data, history))
    }
})

export const Login = withRouter(connect(mapStateLogin, mapDispatch)(AuthScreen))
export const Signup = withRouter(connect(mapStateSignup, mapDispatch)(AuthScreen))
