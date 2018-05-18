import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMe } from './store'
import { 
    BrowserRouter as Router,
    Route,
    Switch,
 } from 'react-router-dom'
import {
    Main,
    Login,
    Signup,
    NotFound,
    HomeScreen,
    BlogScreen
} from './screens'

class Routes extends Component {
     componentDidMount() {
        if(localStorage.getItem('JB_JWT')) {
            this.props.getMe()
        }
     }
     render() {
         const { isLoggedIn } = this.props
         return (
             <Router>
                 <Main>
                    <Switch>
                        <Route exact path='/' component={HomeScreen} />
                        <Route path="/blog" component={BlogScreen} />
                        {   
                            !isLoggedIn &&
                            <Switch>
                                <Route path='/signup' component={Signup} />
                                <Route path='/login' component={Login} />
                                <Route component={NotFound} />
                            </Switch>
                        }
                        <Route component={NotFound} />
                    </Switch>
                 </Main>
            </Router>
         )
     }
 }

const mapState = state => ({
    isLoggedIn: !!state.User.id
})

const mapDispatch = (dispatch, props) => ({
    getMe() {
        dispatch(fetchMe())
    }
})

export default connect(mapState, mapDispatch)(Routes)