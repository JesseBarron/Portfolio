import React, { Component } from 'react'
import { NavBar, Footer } from '../components'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showDrawer: ''
        }
    }
    toggleDrawer = () => {
      this.setState({showDrawer: this.state.showDrawer ? '' : 'show'})
    }
    render() {
        return (
            <div>
                <NavBar showDrawer={this.state.showDrawer} toggleDrawer={this.toggleDrawer}/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
