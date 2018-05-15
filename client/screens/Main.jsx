import React, { Component } from 'react'
import { NavBar } from '../components'

export default class Main extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}