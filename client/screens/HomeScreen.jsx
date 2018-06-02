import React, { Component } from 'react'
import { connect } from  'react-redux'
import { 
    Bio, 
    ProjectSec 
} from '../components'
import {
    fetchProjects
} from '../store'

import './styles/_homeScreenStyles.scss'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getFeaturedProjects()
    }
    render() {
        const { featuredProjects } = this.props
    
        return (
            <div className="home-screen-container">
                <h1>{`Welcome ${this.props.userName || ''}!`}</h1>
                <section className="home-bio">
                    <Bio />
                </section>
                <section className="home-projects">
                    <ProjectSec featuredProjects={featuredProjects}/>
                </section>
                <h3>This is the home screen</h3>
            </div>
        )
    }
}
const mapState = store =>({
    userName: store.User.name,
    featuredProjects: store.Projects.projects.slice(0, 3)
})

const mapDispatch = dispatch => ({
    getFeaturedProjects() {
        dispatch(fetchProjects({query: {featured: true}}))
    }
})
export default connect(mapState, mapDispatch)(HomeScreen)
