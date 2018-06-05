import React, { Component } from 'react'
import { connect } from  'react-redux'
import { 
    Bio, 
    ProjectSec,
    ProjectModal
} from '../components'
import {
    fetchProjects
} from '../store'

import './styles/_homeScreenStyles.scss'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProject: {},
        }
    }
    componentDidMount() {
        this.props.getFeaturedProjects()
    }
    closeProjectModal = () => {
        this.setState({ selectedProject: {} })
        document.removeEventListener('keyup', (e) => {
        })
    }
    openProjectModal = (selectedProject) => {
        this.setState({ selectedProject })
        document.addEventListener('keyup', (e) => {
            if(e.key == "Escape") {
                this.closeProjectModal()
            }
        })
    }
    render() {
        const { featuredProjects } = this.props
        const { selectedProject } = this.state
        return (
            <div className="home-screen-container">
                <h1>{`Welcome ${this.props.userName || ''}!`}</h1>
                <section className="home-bio">
                    <Bio />
                </section>
                <section className="home-projects">
                    <ProjectSec 
                        featuredProjects={featuredProjects} 
                        open={this.openProjectModal}
                    />
                    {
                        selectedProject._id &&
                        <ProjectModal project={selectedProject} close={this.closeProjectModal}/>
                    }
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
