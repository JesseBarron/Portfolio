import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaQuoteLeft } from 'react-icons/lib/fa'
import './styles/hoverMenuStyle.scss'

const IconDict = {
  bold: <FaBold color='white'/>,
  italic: <FaItalic color='white'/>,
  underline: <FaUnderline color='white'/>,
  strike: <FaStrikethrough color='white'/>,
  quote: <FaQuoteLeft color='white'/>
}
class HoverMenu extends Component {
  constructor(props) {
    super(props)
  }

  hasMark = (type, objType) => {
    const { value } = this.props
    if (objType == 'mark') {
      return value.activeMarks.some(mark => mark.type == type)
    }
    return value.blocks.some(block => block.type == type)
  }
  onClickButton = (e, type, objType) => {
    const { value, onChange } = this.props
    const isBlock = this.hasMark(type, objType)
    e.preventDefault()
    const change = objType == 'mark' 
      ? value.change().toggleMark(type) 
      : value.change().setBlocks(isBlock ? 'paragraph' : type)
    onChange(change);
  }
  renderHoverButton = (type, objType) => {
    const isActive = this.hasMark(type, objType);
    const onMouseDown = (e) => this.onClickButton(e, type, objType)
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
        {this.renderHoverButton('bold', 'mark')}
        {this.renderHoverButton('italic', 'mark')}
        {this.renderHoverButton('underline', 'mark')}
        {this.renderHoverButton('strike', 'mark')}
        {this.renderHoverButton('quote', 'node')}
      </div>,
      root
    )
  }
}

export default HoverMenu