import React, { Component } from 'react'
import faker from 'faker'
import './styles/bioStyles.scss'

const Bio = (props) => {
    return (
        <div className="bio-container">
            <div className="image-container">
                <img src={faker.image.imageUrl()} height={200} width={200} alt="God"/>
            </div>
            <div className="bio-paragraph">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid debitis cumque commodi nihil culpa enim illo sit. Eum fugit nisi quisquam ab eius. Corporis esse a asperiores reprehenderit inventore doloremque!</p>
            </div>
        </div>
    )
}
export default Bio