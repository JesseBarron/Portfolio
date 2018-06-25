import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/modalStyles.scss'
//Needs to take a prop that opens the window, and needs a close function that hides the modal.... 
//Idealy this would all be self contained in the class.. I would need to figure out away to update this from a parent 
//component

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  static defaultProps = {
    options: {
      buttons: true,
      backgrndClose: true
    }
  }
  componentDidMount() {
    this.show()
  }
  componentDidUpdate({ show }) {
    if(show != this.props.show) {
      this.show() 
    }
  }
  show = () => {
    const { show } = this.props
    if(show) {
      this.open()
    } else {
      this.close()
    }
  } 
  open = () => {
    this.setState({ open: true })
  }
  close = () => {
    this.setState({ open: false })
  }
  render() {
    const { open } = this.state
    const { options } = this.props
    const showModal = this.state.open ? 'show' : '';
    return (
      <div className={`modal-container ${showModal}`}>
        <div className="background" onClick={() => options.backgrndClose ? this.close : null}></div>
        {
          options.buttons &&
          <button id="project-modal-close" onClick={this.close}>X</button>
        }
        {
          open &&
          <div className="modal-display">
            {this.props.children}
          </div>
        }
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired
}

export default Modal