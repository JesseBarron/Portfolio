import React, { Component } from 'react'

import {
    ProjectDisplay
} from './index'
import './styles/projectSecStyles.scss'


const ProjectSec = (props) => {
    const { close, open } = props
    return (
        <div className="projects-container">
                {
                    props.featuredProjects.map((proj, i) => {
                        return (
                            <React.Fragment key={proj._id}>
                                <ProjectDisplay proj={proj} open={open} fullDesc={false} styles={{height: '15rem'}}/>
                            </React.Fragment>
                        )
                    })
                }
        </div>
    )
}
export default ProjectSec