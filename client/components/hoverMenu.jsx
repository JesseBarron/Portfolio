import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from 'react-icons/lib/fa'
import './styles/hoverMenuStyle.scss'

const IconDict = {
  bold: <FaBold color='white'/>,
  italic: <FaItalic color='white'/>,
  underline: <FaUnderline color='white'/>,
  strike: <FaStrikethrough color='white'/>
}
class HoverMenu extends Component {
  constructor(props) {
    super(props)
  }
  hasMark = (type) => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }
  onClickMark = (e, type) => {
    const { value, onChange } = this.props
    e.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change);
  }
  renderMarkButton = (type) => {
    const isActive = this.hasMark(type);
    const onMouseDown = (e) => this.onClickMark(e, type)
    return (
      <span className="hover-bttn" onMouseDown={onMouseDown} data-active={isActive}>
        {IconDict[type]}
      </span>
    )
  }
  render() {
    const root = window.document.getElementById('root')
    return ReactDom.createPortal(
      <div className='menu hover-menu' ref={this.props.menuRef}>
        {this.renderMarkButton('bold')}
        {this.renderMarkButton('italic')}
        {this.renderMarkButton('underline')}
        {this.renderMarkButton('strike')}
      </div>,
      root
    )
  }
}

export default HoverMenu