import React,{ Component } from 'react'
import {
    PostgreSQLSVG,
    ReactSVG,
    ReduxSVG,
    MongoSVG,
    WebpackSVG,
    JavascriptSVG,
    NodeSVG,
    FeathersSVG,
    JavaSVG,
    SwiftSVG,
} from '../components/svgIcons'


const techList = {
    ReactNative: ReactSVG,
    PostgreSQL: PostgreSQLSVG,
    JavaScript: JavascriptSVG,
    MongoDB: MongoSVG,
    "Node.js": NodeSVG,
    Webpack: WebpackSVG,
    React: ReactSVG,
    Redux: ReduxSVG
}

const getTech = (techArr, w, h, id) => {
    const techIcons = techArr.map((tech, i) => {
        if(techList[tech]) {
            let NewTech = techList[tech]
            return (
                <div key={id+i}>
                    <NewTech width={w} h={h}/>
                </div>
            )
        }
    })
    return techIcons
}

export default getTech