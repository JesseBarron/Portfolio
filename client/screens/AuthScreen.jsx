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
            this.setState({ submitDisabled: false })
            return true
        } else {
            this.setState({ submitDisabled: true })
            return false
        }
    }

    validateSignup = () => {
        const { email, name, password, confirmPW } = this.state
        if(email && name && password && confirmPW && this.checkPW()) {
            this.setState({ submitDisabled: false })
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
        const { email, name, password, submitDisabled, confirmPW, error } = this.state
        const { type } = this.props
        return (
            <div className="authFormContainer">
                <div className="formHeader">
                    <h1>{type}</h1>
                    <ErrorDisplay error={error}/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {
                        type == 'signup' &&
                        <div>
                            <h5>Name</h5>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => this.handleInputChange('name', e)}
                            />
                        </div>
                    }
                    <div>
                        <h5>email</h5>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => this.handleInputChange('email', e)}
                        />
                    </div>
                    <div>
                        <h5>password</h5>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => this.handleInputChange('password', e)}
                        />
                    </div>
                    {
                        type == 'signup' &&
                        <div>
                            <h5>Confirm password</h5>
                            <input
                                type="password"
                                value={confirmPW}
                                onChange={(e) => this.handleInputChange('confirmPW', e)}
                            />
                        </div>
                    }
                    <button type="submit" disabled={submitDisabled}>{type}</button>
                </form>
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
