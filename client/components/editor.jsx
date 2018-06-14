import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import './styles/editorStyles.scss'
import { EditorBttns, HoverMenu } from './index'
import {
  plugins,
  schema,
  CodeNode,
  BoldMark,
  ItalicMark,
  UnderlineMark,
  StrikeMark,
  ImageNode,
} from './editorNodes'

const existingValue = JSON.parse(localStorage.getItem('blog'))
const initialValue = Value.fromJSON(
  existingValue ||{
  document:{
    nodes: [
      {
        object: 'block',
        type: 'title',
      },
    ]
  }
})

class EditorComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: initialValue,
      published: false,
    }
  }
  componentDidMount() {
    this.updateMenu()
  }
  componentDidUpdate() {
    this.updateMenu()
  }
  menuRef = (menu) => {
    this.menu = menu
  }
  handleChange = ({value}) => {
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('blog', content)
    this.setState({ value });
  }
  addImage = (e, type) => {
    const { value } = this.state
    const change = value.change().insertBlock({
      type: 'image',
      isVoid: true,
    })
    this.handleChange(change)
  }
  publish = () => {
    this.setState({ published: true })
  }
  updateMenu = () => {
    const { value } = this.state
    const menu = this.menu
    if(!menu) return

    if(value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style')
      return 
    }
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style['pointer-events'] = 'auto'
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`
  }
  render() {
    return (
      <div className={`editor ${this.state.published ? 'publish' : ''}`}>
        <HoverMenu 
          menuRef={this.menuRef}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Editor
          readOnly={this.state.published}
          plugins={plugins}
          schema={schema}
          value={this.state.value}
          onChange={this.handleChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          renderPlaceholder={this.renderPlaceholder}
        />
        <EditorBttns 
          publish={this.publish}
          hide={this.state.published}
        />
      </div>
    )
  }
  renderPlaceholder = (props) => {
    const { node, editor } = props
    const patt = /^title/gi
    if(node.object != 'block') return
    if(!patt.test(node.type)) return
    if(node.text != '') return

    return (
      <span
        contentEditable={false}
        style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0.33' }}
      >
        Title . . .
      </span>
    )
  }
  renderNode = (props) => {
    switch(props.node.type) {
      case 'paragraph':
        return (
          <div {...props.attributes} >
            <p>
              {props.children}
            </p>
          </div>
        )
      case 'title':
        return <h2 {...props.attributes} className={`title ${this.state.published ? 'published':''}`}>{props.children}</h2>
      case 'code':
        return <CodeNode {...props} />
      case 'image':
        return <ImageNode {...props} />
    }
  }
  renderMark = (props) => {
    switch(props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      case 'underline':
        return <UnderlineMark {...props} />
      case 'strike':
        return <StrikeMark {...props} />
    }
  }
}

export default EditorComp