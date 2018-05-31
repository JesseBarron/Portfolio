import React, { Component } from 'react'
import {
    FaTwitterSquare,
    FaLinkedinSquare,
    FaGithubSquare
} from 'react-icons/lib/fa'

import './styles/socialBttnsStyles.scss'

const SocialBttns = (props) => {
    return (
        <div className="socialBttn_container">
            <div className="label">
                <header>Socials</header>
            </div>
            <div className="socialBttn">
                <a href="https://www.twitter.com" target="_blank">
                    <FaTwitterSquare size={32} />
                </a>
                Follow Me!
            </div>
            <div className="socialBttn">
                <a href="https://www.linkedin.com/in/jesse-barron/" target="_blank">
                    <FaLinkedinSquare size={32} />
                </a>
                <p>Connect with me!</p>
            </div>
            <div className="socialBttn">
                <a href="https://github.com/JesseBarron" target="_blank">
                    <FaGithubSquare size={32} />
                </a>
                <p>Star Me?</p>
            </div>
        </div>
    )
}
export default SocialBttns