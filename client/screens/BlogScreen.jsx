import React, { Component } from 'react'
import { Editor } from '../components'


export default class BlogScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>this is the Blog</h1>
                <div>
                    <Editor />
                </div>
            </div>
        )
    }
}