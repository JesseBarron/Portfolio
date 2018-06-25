import React, { Component } from 'react'
import { NavBar, Footer } from '../components'
import Steer from 'steerjs'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showDrawer: '',
          menuAnimation: ''
        }
    }
    componentDidMount() {
        Steer.set({
            events: false,
            down: (y) => {
                this.scrollHandler()
            }
        })
        document.addEventListener('scroll', (e) => {
            Steer.trigger()
        })
    }
    scrollHandler = () => {
        this.setState({menuAnimation: 'move-bottom-left'})
    }
    toggleDrawer = () => {
      this.setState({showDrawer: this.state.showDrawer ? '' : 'show'})
    }
    render() {
        return (
            <div>
                <NavBar 
                    showDrawer={this.state.showDrawer} 
                    toggleDrawer={this.toggleDrawer}
                    menuAnimation={this.state.menuAnimation}
                />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
