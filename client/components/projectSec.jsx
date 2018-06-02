import React, { Component } from 'react'

import './styles/projectSecStyles.scss'
// import {
//     PostgreSQLSVG,
//     ReactSVG,
//     ReduxSVG,
//     MongoSVG,
//     WebpackSVG,
//     JavascriptSVG,
//     NodeSVG,
//     FeathersSVG,
//     JavaSVG,
//     SwiftSVG
// } from './svgIcons'
import getTech from '../utility/generateTechIcons'


const ProjectSec = (props) => {
    return (
        <div className="projects-container">
                {
                    props.featuredProjects.map((proj, i) => {
                        return (
                            <div key={proj._id} className={`featured-project`}>
                                <img src={`assets/Dstag.jpg`} alt={`${proj.title} Thumbnail`} />
                                <h2>{proj.title.toUpperCase()}</h2>
                                <div className="icons">
                                    {
                                        getTech(proj.technologies, 30, 30, proj._id)
                                    }
                                    {/* <PostgreSQLSVG width={30} height={30}/>
                                    <ReactSVG width={30} height={30}/>
                                    <ReduxSVG width={30} height={30}/>
                                    <MongoSVG width={30} height={30}/>
                                    <WebpackSVG width={30} height={30}/>
                                    <JavascriptSVG width={30} height={30}/>
                                    <NodeSVG width={30} height={30}/>
                                    <FeathersSVG width={30} height={30}/>
                                    <JavaSVG width={30} height={30}/>
                                    <SwiftSVG width={30} height={30}/> */}
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    )
}
export default ProjectSec