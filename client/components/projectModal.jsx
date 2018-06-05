import React, { Component } from 'react'

import { ProjectDisplay } from './index'
import './styles/projectModalStyles.scss'

const ProjectModal = ({project, close}) => {

    return (
        <div className='project-modal-container'>
            <div className="background" onClick={close}></div>
            <div className="project-display" key={project._id+'modal'}>
                <ProjectDisplay
                    proj={project} 
                    close={close}
                    fullDesc={true}
                    styles={{
                        height: '100%',
                        width: '100%',
                        cursor: 'auto'
                    }}
                />
            </div>
        </div>
    )
}
export default ProjectModal