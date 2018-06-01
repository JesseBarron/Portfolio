import React, { Component } from 'react'
import { connect } from  'react-redux'
import { 
    Bio, 
    ProjectSec 
} from '../components'

import './styles/_homeScreenStyles.scss'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="home-screen-container">
                <h1>{`Welcome ${this.props.userName || ''}!`}</h1>
                <section className="home-bio">
                    <Bio />
                </section>
                <section className="home-projects">
                    <ProjectSec />
                </section>
                <h3>This is the home screen</h3>
            </div>
        )
    }
}
const mapState = state =>({
    userName: state.User.name
})

const mapDispatch = dispatch => ({

})
export default connect(mapState, mapDispatch)(HomeScreen)
