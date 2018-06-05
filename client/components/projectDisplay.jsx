import React, { Component } from 'react'

import getTech from '../utility/generateTechIcons'
import './styles/ProjectDisplayStyles.scss'


const ProjectDisplay = ({ proj, open, close, fullDesc, styles}) => {
    return (
        <div 
            key={proj._id}
            className={`featured-project`} 
            onClick={() => open ? open(proj) : null }
            style={styles}
        >
            <div className="background-gradient"></div>
            {
                fullDesc &&
                <button id="project-modal-close" onClick={close}>X</button>
            }
            <img src={`assets/Dstag.jpg`} alt={`${proj.title} Thumbnail`} />
            <h2>{proj.title.toUpperCase()}</h2>
            {
                fullDesc &&
                <div className="project-description">
                    <p>{proj.description}</p>
                    <div className="project-links" style={{marginTop: '20px', display: 'flex'}}>
                        <div>
                            Website: 
                            <a href="" target="#blank"> GitHub</a>
                        </div>
                        <div>
                            GitHub: 
                            <a href="" target="#blank"> GitHub</a>
                        </div>
                        <div>
                            Android: 
                            <a href="" target="#blank"> GitHub</a>
                        </div>
                    </div>
                </div>
            }
            <div className="icons">
                {
                    getTech(proj.technologies, 30, 30, proj._id)
                }
            </div>
        </div>
    )
}
export default ProjectDisplay